// remove all children nodes
const removeChildren = parent => {
    while(parent.hasChildNodes()){
        parent.removeChild(parent.lastChild);
    }
}