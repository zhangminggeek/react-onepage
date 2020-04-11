import React, { Component, RefObject } from 'react';
import './style/index.less';
import throttle from 'lodash.throttle';

interface OnePageProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface OnePageState {
  index: number; // 当前显示页索引
}

export class OnePage extends Component<OnePageProps, OnePageState> {
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

  handleScroll = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      this.next();
    } else {
      this.prev();
    }
  };

  componentDidMount() {
    // 挂载滚轮事件
    window.addEventListener(
      'wheel',
      throttle(this.handleScroll, 1500, { leading: true, trailing: false }),
      { passive: false }
    );
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleScroll);
  }

  render() {
    const { className, style, children } = this.props;
    const { index } = this.state;

    let onepageClassName = 'onepage';
    if (className) onepageClassName += ` ${className}`;

    return (
      <div className={onepageClassName} style={style}>
        <div
          ref={this.contentRef}
          className="onepage-content"
          style={{ transform: `translateY(-${index * 100}vh)` }}
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
