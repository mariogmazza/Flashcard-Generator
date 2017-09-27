var basicCard=function(front,back) {

    if (!(this instanceof basicCard)) { 
        return new basicCard(front, back);
      }

    this.front=front;
    this.back=back;
}

module.exports=basicCard;  