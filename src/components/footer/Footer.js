import React from 'react'
import { Link } from "gatsby"

import { Container } from 'components/container/Container'
import WknLogo from 'assets/svg/wkn.svg'

import s from './Footer.module.scss';

export class Footer extends React.Component {
  
  constructor(props) {
    
    super(props);
    this.state = { 
      dimensions : null 
    };
    
    this.Footer = React.createRef();
    
  }
  
  updateSize() {
    this.setState({
      dimensions: {
        height: this.Footer.offsetHeight,
      }
    }, function() {
      this.props.getFooterSize(this.state.dimensions);
    });
  }
  
  componentDidMount() {
    this.updateSize();
    window.addEventListener('resize', this.updateSize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize.bind(this));
  }
  
  
  render() {
    
    return (
      
      <>
      
        <footer ref={el => (this.Footer = el)} className={s.Footer}>
          <Container className={s.Footer__container}>
          
            <Link className={s.brand} to="/">
              <WknLogo />
            </Link>
          
            <a href="http://www.wokine.com" className={s.made__by} target="_blank" rel="noopener noreferrer">
              © Copyright
              <span className={s.wkn}>
                <WknLogo/>
              </span>
            </a>
            
          </Container>
        </footer>
        
      </>
      
    )
  }
}
