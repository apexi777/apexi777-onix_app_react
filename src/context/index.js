import { createContext } from 'react';

const MyContext = createContext();

export default MyContext;

// export class MyProvider extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       values: 'intermediate value'
//     };
//   }

//   componentDidMount() {
//     const value = this.props;
//     this.setState(({ values : value }));
//   }
  
//   render() {
//     const { values } = this.state;
//     const { children } = this.props;
//     return (
//       <MyContext.Provider value={values}>
//         {children}
//       </MyContext.Provider>
//     );
//   }
// }

// export class MyConsumer extends Component {
//   render() {
//     return (
//       <MyContext.Consumer>
//         {(context) => this.props.children(context)}
//       </MyContext.Consumer>
//     );
//   }
// }
