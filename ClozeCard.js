var ClozedCard=function(fulltext,cloze){

    if (!(this instanceof ClozedCard)) { 
        return new ClozedCard(fulltext, cloze);
      }

    this.fulltext=fulltext;
    this.cloze=cloze;
    
}

ClozedCard.prototype.partial=function(){
    //spliting the arg "cloze" in case is more than one word which converts it into an Array
    var clozeArr=this.cloze.split(" ");
   // spliting the "fulltext" arg in order to use the Array properties 
    var fullArr=this.fulltext.split(" ")

    for (var i = 0; i < clozeArr.length; i++) {
        var index = fullArr.indexOf(clozeArr[i]);   
        if (index !== -1) {
            fullArr.splice(index, 1,"...");
        }else{
            throw "The cloze is not in text provided"
        }  
    }

   return fullArr.join(" ");

}
// var dog= new ClozedCard("George Washington was the first president of the United States.","George first");

//   console.log(dog.partial());
module.exports=ClozedCard;