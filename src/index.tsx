import React, { Component, RefObject } from 'react';
import './style/index.less';

interface OnePageProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface OnePageState {
  index: number; // 当前显示页索引
  canScroll: boolean; // 是否允许滚动
}

export class OnePage extends Component<OnePageProps, OnePageState> {
  private contentRef: RefObject<HTMLDivElement> = React.createRef();

  constructor(props: OnePageProps) {
    super(props);

    this.state = {
      index: 0,
      canScroll: true,
    };
  }

  prev = (): void => {
    const { index, canScroll } = this.state;
    // 判断是否允许滚动
    if (!canScroll) return;
    // 判断当前index
    if (index < 1) return;
    this.setState({ index: index - 1, canScroll: false });
  };

  next = (): void => {
    const { index, canScroll } = this.state;
    // 判断是否允许滚动
    if (!canScroll) return;
    const { children } = this.props;
    const count = React.Children.count(children);
    // 判断当前index
    if (index >= count - 1) return;
    this.setState({ index: index + 1, canScroll: false });
  };

  go = (index: number): void => {
    const { canScroll } = this.state;
    // 判断是否允许滚动
    if (!canScroll) return;
    this.setState({ index, canScroll: false });
  };

  handleScroll = (e: WheelEvent): void => {
    if (e.deltaY > 0) {
      this.next();
    } else {
      this.prev();
    }
  };

  componentDidMount() {
    // 挂载滚轮事件
    window.addEventListener('wheel', this.handleScroll);
    // 滚动节流
    const node = this.contentRef.current;
    if (node) {
      node.addEventListener('transitionend', () => {
        this.setState({ canScroll: true });
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleScroll);
    const node = this.contentRef.current;
    if (node) {
      node.removeEventListener('transitionend', () => {
        this.setState({ canScroll: true });
      });
    }
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
