// @ts-nocheck
/**
 * Interactive logic ported from the native GitFlow DC artifact.
 */

export class GitFlowLogic {
  state = { tab: 'feature', referenceTab: 'raw', slide: 1, auto: true };

  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.state.auto) this.setState(s => ({ slide: s.slide === 6 ? 1 : s.slide + 1 }));
    }, 7000);
    const nodes = document.querySelectorAll('[data-anim="tree"]');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(n => { n.style.animationPlayState = 'running'; });
      return;
    }
    this.io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.animationPlayState = 'running';
          this.io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    nodes.forEach(n => this.io.observe(n));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    if (this.io) this.io.disconnect();
  }

  goTo(n) {
    this.setState({ slide: n, auto: false });
  }

  dotStyle(active) {
    return {
      width: '38px',
      height: '38px',
      border: '4px solid ' + (active ? '#FFB703' : '#F6EDE4'),
      background: active ? '#FFB703' : 'transparent',
      color: active ? '#1A1210' : '#F6EDE4',
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 800,
      fontSize: '15px',
      cursor: 'pointer'
    };
  }

  tabStyle(active) {
    return {
      flex: '1 1 200px',
      minWidth: '180px',
      padding: '18px 16px',
      border: 0,
      borderRight: '6px solid #1A1210',
      background: active ? '#1A1210' : '#FFF',
      color: active ? '#FFB703' : '#1A1210',
      fontFamily: "'Archivo Black', sans-serif",
      fontSize: '17px',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      textAlign: 'left'
    };
  }

  referenceStyle(active) {
    return {
      padding: '12px 16px',
      border: 0,
      borderRight: '4px solid #1A1210',
      background: active ? '#1A1210' : '#FFF',
      color: active ? '#FFB703' : '#1A1210',
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 800,
      fontSize: '14px',
      letterSpacing: '0.08em',
      cursor: 'pointer'
    };
  }

  renderVals() {
    const tab = this.state.tab;
    const referenceTab = this.state.referenceTab;
    const s = this.state.slide;
    const navBtnStyle = {
      padding: '14px 20px',
      border: 0,
      borderRight: '6px solid #F6EDE4',
      background: '#1A1210',
      color: '#F6EDE4',
      fontFamily: "'Archivo Black', sans-serif",
      fontSize: '15px',
      letterSpacing: '0.1em',
      cursor: 'pointer'
    };
    return {
      showAscii: this.props.showAscii ?? true,
      isS1: s === 1, isS2: s === 2, isS3: s === 3, isS4: s === 4, isS5: s === 5, isS6: s === 6,
      go1: () => this.goTo(1), go2: () => this.goTo(2), go3: () => this.goTo(3),
      go4: () => this.goTo(4), go5: () => this.goTo(5), go6: () => this.goTo(6),
      prevSlide: () => this.goTo(s === 1 ? 6 : s - 1),
      nextSlide: () => this.goTo(s === 6 ? 1 : s + 1),
      navBtnStyle,
      dot1Style: this.dotStyle(s === 1), dot2Style: this.dotStyle(s === 2),
      dot3Style: this.dotStyle(s === 3), dot4Style: this.dotStyle(s === 4),
      dot5Style: this.dotStyle(s === 5), dot6Style: this.dotStyle(s === 6),
      isFeature: tab === 'feature',
      isRelease: tab === 'release',
      isHotfix: tab === 'hotfix',
      pickFeature: () => this.setState({ tab: 'feature' }),
      pickRelease: () => this.setState({ tab: 'release' }),
      pickHotfix: () => this.setState({ tab: 'hotfix' }),
      tabFeatureStyle: this.tabStyle(tab === 'feature'),
      tabReleaseStyle: this.tabStyle(tab === 'release'),
      tabHotfixStyle: this.tabStyle(tab === 'hotfix'),
      isRaw: referenceTab === 'raw',
      isFlow: referenceTab === 'flow',
      pickRaw: () => this.setState({ referenceTab: 'raw' }),
      pickFlow: () => this.setState({ referenceTab: 'flow' }),
      rawBtnStyle: this.referenceStyle(referenceTab === 'raw'),
      flowBtnStyle: this.referenceStyle(referenceTab === 'flow')
    };
  }
}
