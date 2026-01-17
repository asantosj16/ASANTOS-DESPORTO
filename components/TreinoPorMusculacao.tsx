import React, { useState } from 'react';
import { Dumbbell, CheckCircle2, ArrowRight, Play, X, Target, Zap, AlertCircle } from 'lucide-react';

interface Exercise {
  name: string;
  videoUrl: string;
  muscles: string[];
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  equipment: string;
  instructions: string[];
  tips: string[];
}

interface MuscleGroup {
  name: string;
  color: string;
  icon: string;
  exercises: Exercise[];
}

const TreinoPorMusculacao: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>('Peito');

  const muscleGroups: MuscleGroup[] = [
    {
      name: 'Peito',
      color: 'bg-red-500',
      icon: '💪',
      exercises: [
        {
          name: 'Supino Reto com Barra',
          videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
          muscles: ['Peitoral Maior', 'Tríceps', 'Deltóide Anterior'],
          difficulty: 'Intermediário',
          equipment: 'Barra e banco reto',
          instructions: [
            'Deite-se no banco reto com os pés apoiados no chão',
            'Segure a barra com pegada um pouco mais larga que os ombros',
            'Desça a barra até tocar o meio do peito',
            'Empurre a barra para cima até extensão completa dos braços'
          ],
          tips: [
            'Mantenha as escápulas retraídas durante todo o movimento',
            'Não deixe a barra quicar no peito',
            'Respire adequadamente: inspire na descida, expire na subida'
          ]
        },
        {
          name: 'Supino Inclinado com Halteres',
          videoUrl: 'https://www.youtube.com/watch?v=8iPEnn-ltC8',
          muscles: ['Peitoral Superior', 'Deltóide Anterior', 'Tríceps'],
          difficulty: 'Intermediário',
          equipment: 'Halteres e banco inclinado (30-45°)',
          instructions: [
            'Sente-se no banco inclinado com halteres nos joelhos',
            'Deite-se levando os halteres até a altura dos ombros',
            'Empurre os halteres para cima até quase encostar um no outro',
            'Desça controladamente até sentir alongamento no peito'
          ],
          tips: [
            'Não incline muito o banco (máx. 45°) para não transferir carga para os ombros',
            'Mantenha os cotovelos levemente dobrados no topo',
            'Controle a descida para maximizar o trabalho muscular'
          ]
        },
        {
          name: 'Crucifixo com Halteres',
          videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0',
          muscles: ['Peitoral Maior', 'Deltóide Anterior'],
          difficulty: 'Iniciante',
          equipment: 'Halteres e banco reto',
          instructions: [
            'Deite-se no banco com halteres estendidos acima do peito',
            'Abra os braços em arco amplo, cotovelos levemente flexionados',
            'Desça até sentir alongamento no peito',
            'Contraia o peito trazendo os halteres de volta ao centro'
          ],
          tips: [
            'Mantenha leve flexão nos cotovelos para proteger as articulações',
            'Movimento deve ser amplo, mas controlado',
            'Foque na contração do peito, não no peso'
          ]
        },
        {
          name: 'Flexão de Braços',
          videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
          muscles: ['Peitoral Maior', 'Tríceps', 'Core'],
          difficulty: 'Iniciante',
          equipment: 'Peso corporal',
          instructions: [
            'Posicione as mãos no chão na largura dos ombros',
            'Mantenha o corpo reto da cabeça aos pés',
            'Desça o corpo até o peito quase tocar o chão',
            'Empurre para cima até extensão completa dos braços'
          ],
          tips: [
            'Mantenha o core contraído durante todo o movimento',
            'Não deixe o quadril cair ou subir demais',
            'Variações: mãos mais juntas (tríceps), mais abertas (peito)'
          ]
        }
      ]
    },
    {
      name: 'Costas',
      color: 'bg-blue-500',
      icon: '🔷',
      exercises: [
        {
          name: 'Barra Fixa',
          videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
          muscles: ['Grande Dorsal', 'Bíceps', 'Trapézio'],
          difficulty: 'Avançado',
          equipment: 'Barra fixa',
          instructions: [
            'Segure a barra com pegada pronada (palmas para frente)',
            'Pendure-se com braços totalmente estendidos',
            'Puxe o corpo para cima até o queixo passar da barra',
            'Desça controladamente até extensão completa'
          ],
          tips: [
            'Ative o core para evitar balanço',
            'Pense em puxar os cotovelos para baixo, não as mãos',
            'Para iniciantes: use faixa elástica ou máquina assistida'
          ]
        },
        {
          name: 'Remada Curvada com Barra',
          videoUrl: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ',
          muscles: ['Grande Dorsal', 'Trapézio', 'Rombóides', 'Eretores da Espinha'],
          difficulty: 'Intermediário',
          equipment: 'Barra',
          instructions: [
            'Segure a barra com pegada pronada, ligeiramente mais larga que os ombros',
            'Flexione o tronco para frente (45°), joelhos levemente flexionados',
            'Puxe a barra até o abdômen inferior',
            'Desça controladamente até extensão completa dos braços'
          ],
          tips: [
            'Mantenha as costas retas durante todo o movimento',
            'Retraia as escápulas no topo do movimento',
            'Não use impulso do quadril - movimento controlado'
          ]
        },
        {
          name: 'Remada com Haltere Unilateral',
          videoUrl: 'https://www.youtube.com/watch?v=roCP6wCXPqo',
          muscles: ['Grande Dorsal', 'Trapézio', 'Rombóides'],
          difficulty: 'Iniciante',
          equipment: 'Haltere e banco',
          instructions: [
            'Apoie joelho e mão no banco, pé oposto no chão',
            'Segure o haltere com braço estendido',
            'Puxe o haltere até a lateral do tronco',
            'Desça controladamente'
          ],
          tips: [
            'Mantenha o tronco paralelo ao chão',
            'Puxe com o cotovelo, não com a mão',
            'Evite rotação excessiva do tronco'
          ]
        },
        {
          name: 'Pulldown na Polia',
          videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
          muscles: ['Grande Dorsal', 'Bíceps', 'Trapézio'],
          difficulty: 'Iniciante',
          equipment: 'Polia alta',
          instructions: [
            'Sente-se e segure a barra com pegada larga',
            'Incline levemente o tronco para trás',
            'Puxe a barra até o topo do peito',
            'Retorne controladamente'
          ],
          tips: [
            'Foque em puxar com as costas, não com os braços',
            'Mantenha o peito para fora',
            'Não se incline excessivamente para trás'
          ]
        },
        {
          name: 'Levantamento Terra',
          videoUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q',
          muscles: ['Eretores da Espinha', 'Glúteos', 'Isquiotibiais', 'Trapézio'],
          difficulty: 'Avançado',
          equipment: 'Barra',
          instructions: [
            'Posicione os pés na largura dos quadris, barra sobre o meio dos pés',
            'Agache e segure a barra com pegada pronada',
            'Mantenha as costas retas, peito para cima',
            'Levante a barra estendendo quadris e joelhos simultaneamente',
            'Desça controladamente mantendo a barra próxima ao corpo'
          ],
          tips: [
            'Este é um dos exercícios mais técnicos - comece com peso leve',
            'Mantenha a barra sempre próxima às pernas',
            'Não arredonde as costas em nenhuma fase do movimento',
            'Use cinto de musculação com cargas pesadas'
          ]
        }
      ]
    },
    {
      name: 'Pernas',
      color: 'bg-green-500',
      icon: '🦵',
      exercises: [
        {
          name: 'Agachamento com Barra',
          videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
          muscles: ['Quadríceps', 'Glúteos', 'Isquiotibiais', 'Core'],
          difficulty: 'Intermediário',
          equipment: 'Barra e rack',
          instructions: [
            'Posicione a barra no trapézio superior',
            'Pés na largura dos ombros, dedos levemente para fora',
            'Desça flexionando quadris e joelhos simultaneamente',
            'Desça até as coxas ficarem paralelas ao chão',
            'Empurre para cima pelos calcanhares'
          ],
          tips: [
            'Mantenha o peito elevado e olhar para frente',
            'Joelhos na direção dos dedos dos pés',
            'Não deixe os joelhos ultrapassarem muito os dedos',
            'Core sempre contraído para proteger a coluna'
          ]
        },
        {
          name: 'Leg Press 45°',
          videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
          muscles: ['Quadríceps', 'Glúteos', 'Isquiotibiais'],
          difficulty: 'Iniciante',
          equipment: 'Máquina leg press',
          instructions: [
            'Sente-se e posicione os pés no meio da plataforma',
            'Destrave a plataforma e flexione os joelhos',
            'Desça até formar 90° nos joelhos',
            'Empurre a plataforma até quase extensão completa'
          ],
          tips: [
            'Não estenda completamente os joelhos no topo',
            'Pés mais altos = mais glúteos; mais baixos = mais quadríceps',
            'Mantenha a lombar apoiada no banco'
          ]
        },
        {
          name: 'Avanço (Afundo)',
          videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U',
          muscles: ['Quadríceps', 'Glúteos', 'Isquiotibiais'],
          difficulty: 'Intermediário',
          equipment: 'Halteres (opcional)',
          instructions: [
            'De pé, dê um passo largo para frente',
            'Desça flexionando ambos os joelhos em 90°',
            'Joelho de trás quase toca o chão',
            'Empurre com a perna da frente para voltar'
          ],
          tips: [
            'Mantenha o tronco ereto',
            'Joelho da frente não ultrapassa muito os dedos',
            'Ótimo exercício para equilíbrio e estabilidade'
          ]
        },
        {
          name: 'Cadeira Extensora',
          videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0',
          muscles: ['Quadríceps'],
          difficulty: 'Iniciante',
          equipment: 'Máquina extensora',
          instructions: [
            'Sente-se e posicione as canelas sob o rolo',
            'Segure nas alças laterais',
            'Estenda as pernas até quase completa extensão',
            'Retorne controladamente'
          ],
          tips: [
            'Movimento isolado para quadríceps',
            'Não trave os joelhos no topo',
            'Controle a descida para máxima eficiência'
          ]
        },
        {
          name: 'Mesa Flexora (Leg Curl)',
          videoUrl: 'https://www.youtube.com/watch?v=ELOCsoDSmrg',
          muscles: ['Isquiotibiais'],
          difficulty: 'Iniciante',
          equipment: 'Máquina flexora',
          instructions: [
            'Deite-se de bruços na máquina',
            'Posicione os tornozelos sob o rolo',
            'Flexione os joelhos trazendo os calcanhares aos glúteos',
            'Retorne controladamente'
          ],
          tips: [
            'Mantenha os quadris no banco',
            'Movimento focado nos isquiotibiais',
            'Evite usar impulso'
          ]
        },
        {
          name: 'Panturrilha em Pé',
          videoUrl: 'https://www.youtube.com/watch?v=JMBXstPNZnA',
          muscles: ['Gastrocnêmio', 'Sóleo'],
          difficulty: 'Iniciante',
          equipment: 'Máquina de panturrilha ou Smith',
          instructions: [
            'Posicione-se na máquina com os ombros sob as almofadas',
            'Dedos dos pés na plataforma, calcanhares para fora',
            'Eleve-se nas pontas dos pés o máximo possível',
            'Desça controladamente alongando as panturrilhas'
          ],
          tips: [
            'Amplitude completa de movimento',
            'Pause no topo para máxima contração',
            'Panturrilhas respondem bem a altas repetições'
          ]
        }
      ]
    },
    {
      name: 'Ombros',
      color: 'bg-purple-500',
      icon: '🏋️',
      exercises: [
        {
          name: 'Desenvolvimento com Barra',
          videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI',
          muscles: ['Deltóide', 'Tríceps', 'Trapézio Superior'],
          difficulty: 'Intermediário',
          equipment: 'Barra',
          instructions: [
            'Segure a barra na altura dos ombros, pegada pronada',
            'Pés na largura dos ombros',
            'Empurre a barra verticalmente até extensão completa',
            'Desça controladamente até a altura do queixo'
          ],
          tips: [
            'Pode ser feito em pé ou sentado',
            'Mantenha o core contraído',
            'Não arqueie excessivamente as costas'
          ]
        },
        {
          name: 'Desenvolvimento com Halteres',
          videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog',
          muscles: ['Deltóide', 'Tríceps'],
          difficulty: 'Iniciante',
          equipment: 'Halteres e banco',
          instructions: [
            'Sente-se com halteres na altura dos ombros',
            'Palmas para frente, cotovelos a 90°',
            'Empurre os halteres para cima até quase encostar',
            'Desça controladamente'
          ],
          tips: [
            'Maior amplitude que com barra',
            'Melhor ativação individual dos deltóides',
            'Mantenha as escápulas estáveis'
          ]
        },
        {
          name: 'Elevação Lateral com Halteres',
          videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
          muscles: ['Deltóide Médio'],
          difficulty: 'Iniciante',
          equipment: 'Halteres',
          instructions: [
            'Em pé, halteres nas laterais do corpo',
            'Eleve os braços lateralmente até a altura dos ombros',
            'Cotovelos levemente flexionados',
            'Desça controladamente'
          ],
          tips: [
            'Não use peso excessivo',
            'Foque na contração do deltóide médio',
            'Evite balançar o corpo para ajudar'
          ]
        },
        {
          name: 'Elevação Frontal',
          videoUrl: 'https://www.youtube.com/watch?v=SDx4GRMtwrs',
          muscles: ['Deltóide Anterior'],
          difficulty: 'Iniciante',
          equipment: 'Halteres ou barra',
          instructions: [
            'Em pé, halteres na frente das coxas',
            'Eleve os braços para frente até a altura dos ombros',
            'Mantenha os braços estendidos',
            'Desça controladamente'
          ],
          tips: [
            'Pode alternar braços ou fazer simultâneo',
            'Mantenha postura ereta',
            'Não arqueie as costas'
          ]
        },
        {
          name: 'Crucifixo Inverso',
          videoUrl: 'https://www.youtube.com/watch?v=T7gWBkkbsP4',
          muscles: ['Deltóide Posterior', 'Trapézio'],
          difficulty: 'Intermediário',
          equipment: 'Halteres',
          instructions: [
            'Incline o tronco para frente (45-90°)',
            'Halteres pendurados abaixo dos ombros',
            'Abra os braços lateralmente mantendo leve flexão nos cotovelos',
            'Contraia as escápulas no topo'
          ],
          tips: [
            'Essencial para equilíbrio dos ombros',
            'Mantenha as costas retas',
            'Movimento deve ser controlado'
          ]
        },
        {
          name: 'Remada Alta',
          videoUrl: 'https://www.youtube.com/watch?v=c5AdA-_JNT0',
          muscles: ['Deltóide', 'Trapézio'],
          difficulty: 'Intermediário',
          equipment: 'Barra ou halteres',
          instructions: [
            'Em pé, segure a barra com pegada mais estreita que os ombros',
            'Puxe a barra verticalmente até a altura do queixo',
            'Cotovelos sobem acima das mãos',
            'Desça controladamente'
          ],
          tips: [
            'Não use pegada muito estreita (pode sobrecarregar os ombros)',
            'Mantenha a barra próxima ao corpo',
            'Alternativa: use halteres para maior liberdade articular'
          ]
        }
      ]
    },
    {
      name: 'Braços',
      color: 'bg-orange-500',
      icon: '💪',
      exercises: [
        {
          name: 'Rosca Direta com Barra',
          videoUrl: 'https://www.youtube.com/watch?v=LY1V6UbRHFM',
          muscles: ['Bíceps'],
          difficulty: 'Iniciante',
          equipment: 'Barra',
          instructions: [
            'Em pé, segure a barra com pegada supinada (palmas para cima)',
            'Cotovelos próximos ao corpo',
            'Flexione os cotovelos elevando a barra',
            'Desça controladamente até extensão completa'
          ],
          tips: [
            'Não balance o corpo',
            'Mantenha os cotovelos fixos',
            'Controle total do movimento'
          ]
        },
        {
          name: 'Rosca Alternada com Halteres',
          videoUrl: 'https://www.youtube.com/watch?v=sAq_ocpRh_I',
          muscles: ['Bíceps', 'Braquial'],
          difficulty: 'Iniciante',
          equipment: 'Halteres',
          instructions: [
            'Em pé ou sentado, halteres nas laterais',
            'Flexione um braço de cada vez',
            'Supine o punho durante a subida',
            'Desça controladamente e alterne'
          ],
          tips: [
            'Permite maior concentração em cada braço',
            'Rotação do punho aumenta ativação',
            'Mantenha postura estável'
          ]
        },
        {
          name: 'Rosca Martelo',
          videoUrl: 'https://www.youtube.com/watch?v=TwD-YGVP4Bk',
          muscles: ['Bíceps', 'Braquial', 'Braquiorradial'],
          difficulty: 'Iniciante',
          equipment: 'Halteres',
          instructions: [
            'Halteres com pegada neutra (palmas face a face)',
            'Flexione os cotovelos mantendo punhos neutros',
            'Suba até os halteres ficarem na altura dos ombros',
            'Desça controladamente'
          ],
          tips: [
            'Trabalha mais o braquial que a rosca tradicional',
            'Ótimo para desenvolvimento dos antebraços',
            'Pode ser feito simultâneo ou alternado'
          ]
        },
        {
          name: 'Rosca Scott',
          videoUrl: 'https://www.youtube.com/watch?v=fIWP-FRFNU0',
          muscles: ['Bíceps'],
          difficulty: 'Intermediário',
          equipment: 'Banco Scott e barra ou halteres',
          instructions: [
            'Sente-se e apoie os braços no banco Scott',
            'Segure a barra com pegada supinada',
            'Flexione os cotovelos sem tirar os braços do apoio',
            'Desça controladamente'
          ],
          tips: [
            'Isola o bíceps removendo ajuda de outros músculos',
            'Não estenda completamente os cotovelos embaixo',
            'Controle rigoroso para evitar lesões'
          ]
        },
        {
          name: 'Tríceps Testa (Francês Deitado)',
          videoUrl: 'https://www.youtube.com/watch?v=d_KZxkY_0cM',
          muscles: ['Tríceps'],
          difficulty: 'Intermediário',
          equipment: 'Barra W ou halteres',
          instructions: [
            'Deitado no banco, barra estendida acima da testa',
            'Flexione apenas os cotovelos, descendo a barra até a testa',
            'Mantenha os cotovelos fixos e perpendiculares ao chão',
            'Estenda os braços de volta'
          ],
          tips: [
            'Use barra W para reduzir tensão nos punhos',
            'Mantenha os cotovelos estáveis',
            'Movimento isolado para cabeça longa do tríceps'
          ]
        },
        {
          name: 'Tríceps Polia (Pushdown)',
          videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU',
          muscles: ['Tríceps'],
          difficulty: 'Iniciante',
          equipment: 'Polia alta com corda ou barra',
          instructions: [
            'Segure a barra ou corda da polia alta',
            'Cotovelos próximos ao corpo',
            'Estenda os braços para baixo',
            'Retorne controladamente'
          ],
          tips: [
            'Não movimente os cotovelos',
            'Extensão completa para máxima contração',
            'Variações: barra reta, barra V, corda'
          ]
        },
        {
          name: 'Tríceps Mergulho (Dips)',
          videoUrl: 'https://www.youtube.com/watch?v=2z8JmcrW-As',
          muscles: ['Tríceps', 'Peitoral Inferior', 'Deltóide Anterior'],
          difficulty: 'Avançado',
          equipment: 'Barras paralelas',
          instructions: [
            'Segure as barras paralelas com braços estendidos',
            'Incline levemente o corpo para frente',
            'Flexione os cotovelos descendo o corpo',
            'Empurre para cima até extensão completa'
          ],
          tips: [
            'Corpo mais ereto = mais tríceps; inclinado = mais peito',
            'Exercício muito eficaz para tríceps',
            'Use peso adicional quando dominar'
          ]
        },
        {
          name: 'Tríceps Coice (Kickback)',
          videoUrl: 'https://www.youtube.com/watch?v=6SS6K3lAwZ8',
          muscles: ['Tríceps'],
          difficulty: 'Iniciante',
          equipment: 'Halteres',
          instructions: [
            'Incline o tronco para frente apoiando uma mão',
            'Cotovelo próximo ao corpo, antebraço pendurado',
            'Estenda o cotovelo levando o haltere para trás',
            'Retorne controladamente'
          ],
          tips: [
            'Mantenha o cotovelo fixo e elevado',
            'Extensão completa para máxima contração',
            'Movimento isolado, use peso moderado'
          ]
        }
      ]
    },
    {
      name: 'Core',
      color: 'bg-yellow-500',
      icon: '⭐',
      exercises: [
        {
          name: 'Prancha (Plank)',
          videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
          muscles: ['Reto Abdominal', 'Transverso', 'Oblíquos'],
          difficulty: 'Iniciante',
          equipment: 'Peso corporal',
          instructions: [
            'Apoie os antebraços e dedos dos pés no chão',
            'Mantenha o corpo reto da cabeça aos pés',
            'Contraia o abdômen e glúteos',
            'Mantenha a posição pelo tempo determinado'
          ],
          tips: [
            'Não deixe o quadril cair ou subir',
            'Respire normalmente',
            'Variações: lateral, elevada, com apoio em um braço'
          ]
        },
        {
          name: 'Abdominal Supra',
          videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU',
          muscles: ['Reto Abdominal Superior'],
          difficulty: 'Iniciante',
          equipment: 'Peso corporal',
          instructions: [
            'Deitado de costas, joelhos flexionados',
            'Mãos atrás da cabeça ou cruzadas no peito',
            'Eleve o tronco contraindo o abdômen',
            'Desça controladamente'
          ],
          tips: [
            'Não puxe o pescoço com as mãos',
            'Movimento curto, foco na contração',
            'Expire ao subir, inspire ao descer'
          ]
        },
        {
          name: 'Elevação de Pernas',
          videoUrl: 'https://www.youtube.com/watch?v=JB2oyawG9KI',
          muscles: ['Reto Abdominal Inferior', 'Flexores do Quadril'],
          difficulty: 'Intermediário',
          equipment: 'Peso corporal',
          instructions: [
            'Deitado de costas, pernas estendidas',
            'Mãos ao lado do corpo ou sob os glúteos',
            'Eleve as pernas até ficarem perpendiculares ao chão',
            'Desça controladamente sem tocar o chão'
          ],
          tips: [
            'Mantenha a lombar apoiada no chão',
            'Não deixe as pernas caírem rapidamente',
            'Para mais desafio: prancha alta com elevação'
          ]
        },
        {
          name: 'Abdominal Bicicleta',
          videoUrl: 'https://www.youtube.com/watch?v=9FGilxCbdz8',
          muscles: ['Oblíquos', 'Reto Abdominal'],
          difficulty: 'Intermediário',
          equipment: 'Peso corporal',
          instructions: [
            'Deitado de costas, mãos atrás da cabeça',
            'Eleve ligeiramente o tronco e as pernas',
            'Leve o cotovelo direito ao joelho esquerdo e vice-versa',
            'Alterne os lados em movimento contínuo'
          ],
          tips: [
            'Um dos exercícios mais completos para abdômen',
            'Mantenha movimento controlado',
            'Foque na rotação do tronco'
          ]
        },
        {
          name: 'Russian Twist',
          videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI',
          muscles: ['Oblíquos', 'Reto Abdominal'],
          difficulty: 'Intermediário',
          equipment: 'Peso corporal ou medicine ball',
          instructions: [
            'Sentado, incline o tronco para trás (45°)',
            'Eleve os pés do chão',
            'Gire o tronco de um lado para o outro',
            'Toque o chão ou haltere de cada lado'
          ],
          tips: [
            'Mantenha o core contraído',
            'Movimento controlado, não use impulso',
            'Para mais desafio: segure peso'
          ]
        },
        {
          name: 'Prancha Lateral',
          videoUrl: 'https://www.youtube.com/watch?v=K2VljzCC16g',
          muscles: ['Oblíquos', 'Transverso', 'Quadrado Lombar'],
          difficulty: 'Intermediário',
          equipment: 'Peso corporal',
          instructions: [
            'Deite de lado apoiando no antebraço',
            'Eleve o quadril alinhando corpo em linha reta',
            'Mantenha a posição',
            'Repita do outro lado'
          ],
          tips: [
            'Essencial para força lateral do core',
            'Não deixe o quadril cair',
            'Variação: suba e desça o quadril'
          ]
        },
        {
          name: 'Mountain Climbers',
          videoUrl: 'https://www.youtube.com/watch?v=nmwgirgXLYM',
          muscles: ['Core Completo', 'Cardio'],
          difficulty: 'Intermediário',
          equipment: 'Peso corporal',
          instructions: [
            'Posição de prancha alta (mãos no chão)',
            'Leve alternadamente os joelhos em direção ao peito',
            'Mantenha o quadril estável',
            'Execute em ritmo rápido'
          ],
          tips: [
            'Excelente para core e cardio',
            'Mantenha o corpo estável',
            'Não eleve demais o quadril'
          ]
        }
      ]
    }
  ];

  const currentGroup = muscleGroups.find(g => g.name === selectedGroup) || muscleGroups[0];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-500';
      case 'Intermediário': return 'bg-yellow-500';
      case 'Avançado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Periodização Section */}
      <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-3 opacity-0" style={{ animationFillMode: 'forwards' }}>
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-slate-900 dark:bg-slate-700 p-2 rounded-xl text-white shadow-md">
              <Dumbbell size={24} />
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Periodização de Musculação</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Modelo clássico de periodização linear ao longo de 32 semanas.</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { phase: "Anatômica", weeks: "1-4", focus: "Adaptação", desc: "Ajuste neural e ligamentar. Cargas baixas, repetições médias/altas.", color: "bg-emerald-500" },
            { phase: "Hipertrofia", weeks: "5-16", focus: "Volume", desc: "Aumento de massa muscular. Cargas moderadas (70-85% 1RM).", color: "bg-blue-500" },
            { phase: "Força Máxima", weeks: "17-24", focus: "Intensidade", desc: "Recrutamento máximo. Cargas altas (>85% 1RM).", color: "bg-red-500" },
            { phase: "Definição", weeks: "25-32", focus: "Qualidade", desc: "Redução de gordura com manutenção de massa magra.", color: "bg-orange-500" }
          ].map((m, idx) => (
            <div key={idx} className="relative group">
              <div className={`absolute -inset-0.5 ${m.color} rounded-2xl opacity-10 group-hover:opacity-20 transition duration-300`}></div>
              <div className="relative bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-md text-white ${m.color}`}>{m.weeks}</span>
                  <CheckCircle2 size={16} className="text-slate-300 dark:text-slate-700" />
                </div>
                <h5 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{m.phase}</h5>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{m.focus}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex-grow">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="px-8 pb-8">
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-2xl text-xs text-amber-700 dark:text-amber-400 font-medium">
            <strong>Nota Técnica:</strong> Este macrociclo deve ser ajustado conforme o nível do atleta.
          </div>
        </div>
      </div>

      {/* Exercise Library Section */}
      <div className="glass-card rounded-3xl overflow-hidden animate-fade-in-up stagger-4 opacity-0" style={{ animationFillMode: 'forwards' }}>
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl text-white shadow-md">
              <Target size={24} />
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Biblioteca de Exercícios</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Mais de 50 exercícios com vídeos demonstrativos e instruções detalhadas</p>
            </div>
          </div>

          {/* Muscle Group Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {muscleGroups.map((group) => (
              <button
                key={group.name}
                onClick={() => setSelectedGroup(group.name)}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                  selectedGroup === group.name
                    ? `${group.color} text-white shadow-lg scale-105`
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:scale-105'
                }`}
              >
                <span className="mr-2">{group.icon}</span>
                {group.name}
              </button>
            ))}
          </div>
        </div>

        {/* Exercise Grid */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentGroup.exercises.map((exercise, idx) => (
              <div
                key={idx}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedExercise(exercise)}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="font-bold text-slate-900 dark:text-white text-lg flex-grow pr-2">{exercise.name}</h5>
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <Play size={20} />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md text-white ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {exercise.equipment}
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Músculos Trabalhados:</p>
                    <div className="flex flex-wrap gap-1">
                      {exercise.muscles.slice(0, 3).map((muscle, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full mt-2 flex items-center justify-center gap-2 text-xs font-black text-blue-600 dark:text-blue-400 hover:gap-3 transition-all">
                    VER VÍDEO E DETALHES <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedExercise(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className={`${currentGroup.color} p-2 rounded-xl text-white text-2xl`}>
                  {currentGroup.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">{selectedExercise.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md text-white ${getDifficultyColor(selectedExercise.difficulty)}`}>
                      {selectedExercise.difficulty}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {selectedExercise.equipment}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedExercise(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                <X size={24} className="text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Video Section */}
              <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video relative">
                <iframe
                  src={selectedExercise.videoUrl.replace('watch?v=', 'embed/')}
                  className="w-full h-full"
                  allowFullScreen
                  title={selectedExercise.name}
                ></iframe>
              </div>

              {/* Muscles Worked */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-6">
                <h4 className="flex items-center gap-2 font-black text-slate-900 dark:text-white mb-3">
                  <Target size={20} className="text-blue-600" />
                  Músculos Trabalhados
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.muscles.map((muscle, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-semibold">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6">
                <h4 className="flex items-center gap-2 font-black text-slate-900 dark:text-white mb-4">
                  <CheckCircle2 size={20} className="text-green-600" />
                  Como Executar
                </h4>
                <ol className="space-y-3">
                  {selectedExercise.instructions.map((instruction, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 flex-grow">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tips */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-2xl p-6">
                <h4 className="flex items-center gap-2 font-black text-slate-900 dark:text-white mb-4">
                  <Zap size={20} className="text-amber-600" />
                  Dicas Importantes
                </h4>
                <ul className="space-y-2">
                  {selectedExercise.tips.map((tip, i) => (
                    <li key={i} className="flex gap-3">
                      <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreinoPorMusculacao;