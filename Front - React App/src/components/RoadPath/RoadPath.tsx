import { Button } from '@chakra-ui/react';
import './RoadPath.css';

const widthSvg = 1310;
const heightSvg = 685;

export const RoadPath = () => {
  return (
    <svg width={widthSvg} height={heightSvg}>
      <path
        // d="
        // M1020 195
        // L1019 320 
        // L955 255 
        // L890 319 
        // L830 255 
        // L715 290 
        // L725 305
        // L690 340
        // L712 362
        // L697 377
        // L725 405
        // L687 444
        // L520 530
        // L410 390
        // L353 410
        // L345 455
        // L387 602
        // L150 590
        // L145 630
        // "
        d="
        M145 630
        L150 590
        L387 602
        L345 455
        L353 410
        L410 390
        L520 530
        L687 444
        L725 405
        L697 377
        L712 362
        L690 340
        L725 305
        L715 290
        L830 255
        L890 319
        L955 255
        L1019 320
        L1020 195
        "
        stroke="yellow"
        strokeWidth="9"
        fill="none"
        className="animated-path"
      />
    </svg>
  );
}



/*

<path
        d="
        
         
         
         
         
         
        
        
        
        
        
        
        
        
        
        
        "

        d="
        M145 630
        L150 590
        L387 602
        L345 455
        L353 410
        L410 390
        L520 530
        L687 444
        L725 405
        L697 377
        L712 362
        L690 340
        L725 305
        L715 290
        L830 255
        L890 319
        L955 255
        L1019 320
        L1020 195
        "
        stroke="yellow"
        strokeWidth="9"
        fill="none"
        className="animated-path"
      />

*/