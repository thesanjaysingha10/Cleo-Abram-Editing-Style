// ---------------------------------------------------------------------------
// Free stand-ins for the Cleo Abram type system, loaded via @remotion/google-fonts
// (blocks rendering until ready). Import once from the composition root.
//   Archivo Black ........ brand, hero words, numbers, equations (ultra-black grotesque)
//   Barlow Semi Condensed  lower thirds, label chips
//   Barlow Condensed ..... guest-question plates
//   Inter ................ micro labels, HUD, wide-tracked statement word
//   Jost ................. sentence-case end-card copy (Futura stand-in)
// ---------------------------------------------------------------------------
import {loadFont as archivoBlack} from '@remotion/google-fonts/ArchivoBlack';
import {loadFont as barlowSemi} from '@remotion/google-fonts/BarlowSemiCondensed';
import {loadFont as barlowCond} from '@remotion/google-fonts/BarlowCondensed';
import {loadFont as inter} from '@remotion/google-fonts/Inter';
import {loadFont as jost} from '@remotion/google-fonts/Jost';

archivoBlack('normal', {weights: ['400'], subsets: ['latin']});
barlowSemi('normal', {weights: ['700', '800'], subsets: ['latin']});
barlowCond('normal', {weights: ['800'], subsets: ['latin']});
inter('normal', {weights: ['400', '700', '800', '900'], subsets: ['latin']});
jost('normal', {weights: ['500'], subsets: ['latin']});
