/**
 *  命令者模式: 
 *      发送者: 发出命令，调用命令对象
 *      命令对象:
 *      接收者: 接受命令， 调用接收者对应的接口
 * 
*/

//接收者
class Receiver {
    exec(){
        console.log("执行----")
    }
}

//命令
class Command{
    constructor(receiver) {
        this.receiver = receiver;
    }

    cmd(){
        this.receiver.exec();
    }
}

class Invoker {
    constructor(command) {
        this.command = command;
    }
    invoke(){
        this.command.cmd();
    }
}

let receiver = new Receiver();

let command = new Command(receiver);

let invoker = new Invoker(command);

invoker.invoke();