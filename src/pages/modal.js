export default function Modal(props){
    return (
        <div className={`modal-backdrop ${props.show ? 'visible' : ''}`}>
            <div className="modal-content">
                <h2>{props.title}</h2>
                <p>{props.content}</p>
                <button onClick={props.onClose}>Close</button>
            </div>
        </div>
    );
}
