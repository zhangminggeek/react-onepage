import React, { Component, RefObject } from 'react';
import './style/index.less';
import throttle from 'lodash.throttle';

interface OnePageProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  speed?: number; // 滚动速度(ms)
  animation?: string; // 动画效果
  delay?: number; // 延迟(ms)
  onTransitionEnd?: Function; // 动画结束回调
}

interface OnePageState {
  index: number; // 当前显示页索引
}

export class OnePage extends Component<OnePageProps, OnePageState> {
  static defaultProps = {
    speed: 1500,
    animation: 'ease',
    delay: 0,
  };

  private contentRef: RefObject<HTMLDivElement> = React.createRef();

  constructor(props: OnePageProps) {
    super(props);

    this.state = {
      index: 0,
    };
  }

  prev = (): void => {
    const { index } = this.state;
    // 判断当前index
    if (index < 1) return;
    this.setState({ index: index - 1 });
  };

  next = (): void => {
    const { index } = this.state;
    const { children } = this.props;
    const count = React.Children.count(children);
    // 判断当前index
    if (index >= count - 1) return;
    this.setState({ index: index + 1 });
  };

  go = (index: number): void => {
    this.setState({ index });
  };

  handleScroll = throttle(
    (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        this.next();
      } else {
        this.prev();
      }
    },
    this.props.speed,
    { leading: true, trailing: false }
  );

  handleTransitionEnd = (e: TransitionEvent) => {
    const { onTransitionEnd } = this.props;
    onTransitionEnd && onTransitionEnd(e);
  };

  componentDidMount() {
    // 挂载滚轮事件
    window.addEventListener('wheel', this.handleScroll, { passive: false });
    // 滚动动画结束回调
    const { onTransitionEnd } = this.props;
    if (onTransitionEnd) {
      window.addEventListener('transitionend', this.handleTransitionEnd);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleScroll);
    const { onTransitionEnd } = this.props;
    if (onTransitionEnd) {
      window.removeEventListener('transitionend', this.handleTransitionEnd);
    }
  }

  render() {
    const { className, style, children, speed, animation, delay } = this.props;
    const { index } = this.state;

    let onepageClassName = 'onepage';
    if (className) onepageClassName += ` ${className}`;

    return (
      <div className={onepageClassName} style={style}>
        <div
          ref={this.contentRef}
          className="onepage-content"
          style={{
            transform: `translateY(-${index * 100}vh)`,
            transition: `all ${(speed as number) / 1000}s ${animation} ${
              (delay as number) / 1000
            }s`,
          }}
        >
          {children}
        </div>
        <div className="onepage-guide">
          {React.Children.map(children, (child, i) => {
            return (
              <i
                className={`onepage-guide-dot ${
                  index === i ? 'onepage-guide-dot-current' : ''
                }`}
                onClick={() => this.go(i)}
              ></i>
            );
          })}
        </div>
      </div>
    );
  }
}

export default OnePage;
