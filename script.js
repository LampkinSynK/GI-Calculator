add = (a,b) => {
    return a+b;
}

subtract = (a,b) => {
    return a-b;
}

divide = (a,b) => {
    if ((a != 0) && (b!=0)) {
        return a/b;
    }
    else {
        return false;
    }
}

multiply = (a,b) => {
    return a*b;
}