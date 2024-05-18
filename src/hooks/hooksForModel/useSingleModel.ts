// type Constructor = {
//   new (props: {name: string}): any;
//   (props: {name: string}): any
// }

const createSingleModel = () => {
  let instance = null

  const createInstance = function(props) {
    this.name = props.name
    return this
  }

  return function(props){
    if(instance) {
      return instance
    }
    // @ts-ignore
    instance = new createInstance(props)
    return instance
  }
}

export default function useSingleModel(){
  const getInstance = createSingleModel()

  console.log('instance1: ', getInstance({name: '123'}))
  console.log('instance2: ', getInstance({name: '456'}))
}