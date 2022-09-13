// Creating a interface to props
interface ButtonProps {
  // This is a mandatory parameter
  title: string;
  // This is a not mandatory parameter
  color?: string;
}

// Creating a custom component, passing the props as ButtonProps type
function Button(props: ButtonProps) {
  return (
    <button>
      {/* Using title data, inside {} -> JS in HTML need to be inside of {} */}
      {props.title}
    </button>
  )
}


function App() {
  return (
    // A component's set must be evolved by another component/tag
    <div>
      {/* Creating some Buttons components, passing a different title (Props) to each one. This Props can be handled by the Component*/}
      <Button title="Send 1" />
      <Button title="Send 2" />
      <Button title="Send 3" />
    </div>
  )
}

export default App
