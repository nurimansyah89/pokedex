import * as React from 'react';
import classNames from 'classnames';
import { Wrapper, Copy, CopyPrev, CopyNext, CopyText, CopyNumber, CopyIcon } from './Navigation.module.scss';

const NavigationComponent = () => (
  <nav className={Wrapper}>
    <div className={classNames('container', Copy)}>
      <a href="/" className={CopyPrev}>
        <span className={classNames('fa-stack', CopyIcon)}>
          <i className="fas fa-circle fa-stack-1x" />
          <i className="fas fa-angle-left fa-stack-1x" />
        </span>
        <span className={CopyText}>
          <span className={CopyNumber}>#809</span>
          <span>Melmetal</span>
        </span>
      </a>

      <a href="/" className={CopyNext}>
        <span className={CopyText}>
          <span>Ivysaur</span>
          <span className={CopyNumber}>#002</span>
        </span>
        <span className={classNames('fa-stack', CopyIcon)}>
          <i className="fas fa-circle fa-stack-1x" />
          <i className="fas fa-angle-right fa-stack-1x" />
        </span>
      </a>
    </div>
  </nav>
);
export default NavigationComponent;
