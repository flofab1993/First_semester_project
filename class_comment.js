class Comment {
    constructor(name, text, time) {
        this.name = name;
        this.text = text;
        this.time = time;
    }

    stringifyComment() {
        var comment = "<span style='font-size:70%'>" + this.name + " wrote:</span><br>" 
                         + this.text + "<br>" 
                         + "<span style='font-size:70%'>" + new Date(this.time) + "</span><br>";
        return comment
    }
}