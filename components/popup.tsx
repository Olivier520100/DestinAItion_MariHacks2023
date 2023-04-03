export default function Pop(props){
    return(<div style = {{position: "absolute", width: "500px", height: "450px", backgroundColor: "#212121", color: 'white', overflowY: "scroll", padding: "20px", borderRadius: "20px"}}>{props.text}</div>)
}