import type { ComponentType } from 'react';
import type { ChapterViewProps } from '../narrative/types.ts';
import { Chapter1View } from '../chapters/1_Introduction/1_IntroductionView.tsx';
import { Chapter2View } from '../chapters/2_BaseContext/Chapter2View.tsx';
import { Chapter3View } from '../chapters/3_BalanceEcosystem/Chapter3View.tsx';
import { Chapter4View } from '../chapters/4_EcologicalOvershoot/Chapter4View.tsx';
import { Chapter5View } from '../chapters/5_EnvironmentFalls/Chapter5View.tsx';
import { Chapter6View } from '../chapters/6_GeneralAnalysis/Chapter6View.tsx';
import { Chapter7View } from '../chapters/7_YourTurn/Chapter7View.tsx';
import { SimulationTestView } from '../dev/SimulationTestView.tsx';

export const CHAPTERS: ComponentType<ChapterViewProps>[] = [
    Chapter1View, Chapter2View, Chapter3View, Chapter4View,
    Chapter5View, Chapter6View, Chapter7View,
];

export const SANDBOX_VIEW: ComponentType<ChapterViewProps> = SimulationTestView;
