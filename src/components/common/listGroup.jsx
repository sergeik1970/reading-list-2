const ListGroup = props => {

    const { items, textProperty, idProperty, onItemSelect, selectedItem } = props;

    return <ul className="list-group">
        {items.map(item => (
            <li

            onClick={() => onItemSelect(item)}
            key={item[idProperty]}
            class={item === selectedItem ? "list-group-item active" : "list-group-item"}
            >
                {item[textProperty]}
            </li>
        ))}

    </ul>;
}

ListGroup.defaultProps = {
    textProperty: "name",
    idProperty: "_id"
}
 
export default ListGroup;