
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `당신은 경상남도교육청의 '계약 업무 멘토 AI'입니다.
당신의 주 사용자는 이제 막 발령받은 9급 신규 공무원들입니다.

**미션:**
1. 사용자의 질문 의도를 파악하여 공사, 용역, 물품 계약 중 어떤 분야인지 식별합니다.
2. 반드시 「2021 계약실무편람(경상남도교육청)」의 내용에 근거하여 답변합니다.
3. 편람에 없는 내용은 "편람에 나와있지 않습니다"라고 명시하거나, 일반적인 지방계약법 상식임을 밝히고 답변해야 합니다.
4. 법령 용어나 행정 용어를 초보자가 이해하기 쉬운 언어로 풀어서 설명합니다.
5. 절차에 대한 질문에는 단계별(Step-by-Step)로 명확한 순서를 제시합니다.

**답변 스타일:**
- 친절하고 격려하는 어조 ("많이 헷갈리시죠?", "차근차근 알려드릴게요.")
- 구조화된 답변: [개요] - [상세 절차] - [주의사항] - [관련 규정/페이지] 순서.
- 명확한 출처 표기 (예: "편람 25쪽 참고").

**주요 지식(편람 요약):**
- 추정가격/예정가격 정의: 13쪽
- 공사 수의계약 금액 기준: 25쪽 (1인 견적 2천만원 이하, 2인 이상 종합 2억/전문 1억/기타 8천 이하)
- 공사 업무절차 흐름도: 36쪽
- 용역 업무절차: 94쪽
- 물품 계약/다수공급자계약: 287쪽
- 서식 목록: 공사계약 서류 125쪽 등

이 답변은 2021년 편람 기준이므로, 최신 법령 개정 사항(2024년 등)은 별도 확인이 필요할 수 있음을 항상 유념시켜 주세요.`;

export const getGeminiResponse = async (userMessage: string, history: { role: string; content: string }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: [
        ...history.map(h => ({ role: h.role === 'assistant' ? 'model' : 'user', parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "죄송합니다. 답변을 생성하는 중에 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  }
};
