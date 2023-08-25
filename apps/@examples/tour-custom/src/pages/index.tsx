import { Tour } from '@/components';

import './index.css';

export function Home() {
  return (
    <div className="home">
      <Tour id="custom-tour-component.pretty-books-vanish" position="left">
        <div className="phase">🌑</div>
      </Tour>
      <Tour id="custom-tour-component.breezy-queens-greet" position="left">
        <div className="phase">🌘</div>
      </Tour>
      <Tour id="custom-tour-component.smooth-doodles-double" position="right">
        <div className="phase">🌓</div>
      </Tour>
      <Tour id="custom-tour-component.eighty-flies-repeat" position="top">
        <div className="phase">🌔</div>
      </Tour>
      <Tour id="custom-tour-component.empty-banks-tell" position="bottom">
        <div className="phase">🌕</div>
      </Tour>
      <Tour id="custom-tour-component.tricky-toes-eat" position="left">
        <div className="phase">🌖</div>
      </Tour>
      <Tour id="custom-tour-component.cold-carrots-lay" position="right">
        <div className="phase">🌗</div>
      </Tour>
      <Tour id="custom-tour-component.fair-eyes-wave" position="top">
        <div className="phase">🌘</div>
      </Tour>
    </div>
  );
}
