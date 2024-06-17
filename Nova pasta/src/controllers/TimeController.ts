class TimeController {

    private startDate:  Date;
    private finishDate: Date;

    constructor(startDate: Date, finishDate: Date){
        this.startDate = startDate;
        this.finishDate = finishDate;
    }

    controlTime(botDate: Date) : boolean{
        const botHours = botDate.getHours();
        const startHours = this.startDate.getHours();
        const finishHours = this.finishDate.getHours();
  
        console.log('botHours  -> ' + botHours);
        console.log('startHours  -> ' + startHours);
        console.log('finishHours  -> ' + finishHours);

        if (botHours >= startHours && botHours < finishHours) {
            console.log("IF controlTime");
            return true;
        }else{
            console.log("ELSE controlTime");
            return false;
        }
       
    }
}

export default TimeController;