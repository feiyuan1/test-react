import React from "react";

type PropsAreEqual<P> = (
  prevProps: Readonly<P>,
  nextProps: Readonly<P>,
) => boolean;

const withSampleHoC = <P extends {}>(
  component: {
    (props: P): Exclude<React.ReactNode, undefined>;
    displayName?: string;
  },
  propsAreEqual?: PropsAreEqual<P> | false,

  componentName = component.displayName ?? component.name,
): {
  (props: P): React.JSX.Element;
  displayName: string;
} => {
  function WithSampleHoc(props: P) {
    //Do something special to justify the HoC.
    return component(props) as React.JSX.Element;
  }

  WithSampleHoc.displayName = `withSampleHoC(${componentName})`;

  let wrappedComponent =
    propsAreEqual === false
      ? WithSampleHoc
      : React.memo(WithSampleHoc, propsAreEqual);

  //copyStaticProperties(component, wrappedComponent);

  return wrappedComponent as typeof WithSampleHoc;
};

const a1: hocProps = ({}) => <>123</>;
a1.displayName = "a2";

type hocProps = Parameters<typeof withSampleHoC>[0];

withSampleHoC(a1);

/**
 * Button HOC
 * 1. 扩充 Button props
 */
interface CustomButtonProps extends BasicButtonProps {
  bg: string;
}

const props: CustomButtonProps = { bg: "", size: "A" };
function Button(props: CustomButtonProps) {
  console.log(props.size);

  return <button></button>;
}

interface MimiButtonProps extends BasicButtonProps {
  border: string;
}
function MiniButton(props: MimiButtonProps) {
  return <></>;
}
interface BasicButtonProps {
  size?: "A" | "C" | "B";
  type?: string;
}

const withButtonProps = <T extends BasicButtonProps>(
  Component: (props: T) => React.ReactNode,
) => {
  const basicProps: BasicButtonProps = {
    size: "A",
    type: "primary",
  };

  function MyComponent(props: T) {
    return <Component {...props} {...basicProps} />;
  }

  return MyComponent;
};

const CustomButton = withButtonProps(Button);
const CustomMiniButton = withButtonProps(MiniButton);

function Test() {
  return (
    <>
      <CustomButton bg="" />
      <CustomMiniButton border="" />
    </>
  );
}

// /**
//  *
//  */

// // these are the props to be injected by the HOC
// interface WithDataProps<T> {
//   data: T; // data is generic
// }
// // T is the type of data
// // P is the props of the wrapped component that is inferred
// // C is the actual interface of the wrapped component (used to grab defaultProps from it)
// export function withSubscription<T, P extends WithDataProps<T>, C>(
//   // this type allows us to infer P, but grab the type of WrappedComponent separately without it interfering with the inference of P
//   WrappedComponent: React.JSXElementConstructor<P> & C,
//   // selectData is a functor for T
//   // props is Readonly because it's readonly inside of the class
//   selectData: (
//     dataSource: typeof DataSource,
//     props: Readonly<React.JSX.LibraryManagedAttributes<C, Omit<P, "data">>>
//   ) => T
// ) {
//   // the magic is here: React.JSX.LibraryManagedAttributes will take the type of WrapedComponent and resolve its default props
//   // against the props of WithData, which is just the original P type with 'data' removed from its requirements
//   type Props = React.JSX.LibraryManagedAttributes<C, Omit<P, "data">>;
//   type State = {
//     data: T;
//   };
//   return class WithData extends React.Component<Props, State> {
//     constructor(props: Props) {
//       super(props);
//       this.handleChange = this.handleChange.bind(this);
//       this.state = {
//         data: selectData(DataSource, props),
//       };
//     }

//     componentDidMount = () => DataSource.addChangeListener(this.handleChange);

//     componentWillUnmount = () =>
//       DataSource.removeChangeListener(this.handleChange);

//     handleChange = () =>
//       this.setState({
//         data: selectData(DataSource, this.props),
//       });

//     render() {
//       // the typing for spreading this.props is... very complex. best way right now is to just type it as any
//       // data will still be typechecked
//       return (
//         <WrappedComponent data={this.state.data} {...(this.props as any)} />
//       );
//     }
//   };
//   // return WithData;
// }

// /** HOC usage with Components */
// export const CommentListWithSubscription = withSubscription(
//   CommentList,
//   (DataSource: DataType) => DataSource.getComments()
// );

// export const BlogPostWithSubscription = withSubscription(
//   BlogPost,
//   (DataSource: DataType, props: Omit<BlogPostProps, "data">) =>
//     DataSource.getBlogPost(props.id)
// );
