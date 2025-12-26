
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export enum ContractCategory {
  GENERAL = '일반',
  CONSTRUCTION = '공사',
  SERVICE = '용역',
  GOODS = '물품'
}
