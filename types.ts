
export enum AppSection {
  HOME = 'home',
  ESCOLAR = 'escolar',
  MUSCULACAO = 'musculacao',
  CORRIDA = 'corrida',
  TRIATHLON = 'triathlon',
  NATACAO = 'natacao',
  DOCUMENTOS = 'documentos',
  NUTRICAO = 'nutricao',
  HYROX = 'hyrox'
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface AICoachResponse {
  advice: string;
  tips: string[];
  suggestedDrills?: string[];
}

export interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  instructions: string;
  detailedDescription: string;
  videoUrl: string;
}

export interface RunningLog {
  id: string;
  date: string;
  distance: number;
  durationSeconds: number;
  pace: string;
  sensation: 'Muito Cansado' | 'Cansado' | 'Bem' | 'Ótimo' | 'Invencível';
  notes?: string;
}

export interface TriathlonLog {
  id: string;
  date: string;
  modality: 'Natação' | 'Ciclismo' | 'Corrida' | 'Brick';
  distance: number;
  durationMinutes: number;
  intensity: 'Z1' | 'Z2' | 'Z3' | 'Z4' | 'Z5';
  notes?: string;
}
