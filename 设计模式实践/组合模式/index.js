/**
 *  组合模式: 将对象组合成树形结构，以表示“部分整体”的层次结构(虚拟DOM就是采用这种模式)
 * 
 * 
*/

// eg: 
// 宏命令:
let MacroCommand = function(){
    return {
        commandsList: [],
        add: function(command){
            this.commandsList.push(command);
        },
        execute: function(){
            for(let i=0, command; command = this.commandsList[i++];){
                command.execute();
            }
        }
    }
};


let openAcCommand = {
    execute: function(){
        console.log( '打开空调' );
    }
};

let openTvCommand = {
    execute: function(){
        console.log( '打开电视' );
    }
};
let openSoundCommand = {
    execute: function(){
        console.log( '打开音响' );
    }
};

let macroCommand1 = MacroCommand();
macroCommand1.add( openTvCommand );
macroCommand1.add( openSoundCommand );


let closeDoorCommand = {
    execute: function(){
        console.log( '关门' );
    }
};

let macroCommand2 = MacroCommand();
macroCommand2.add( closeDoorCommand );

//现在把所有的命令组合成一个“超级命令

let macroCommand = MacroCommand();
macroCommand.add( macroCommand1 );
macroCommand.add( macroCommand2 );

//最后给遥控器绑定“超级命令
let setCommand = (function( command ){
    document.getElementById( 'button' ).onclick = function(){
        command.execute();
    }
})( macroCommand );

// eg2: 文件问题:

// Folder
const Folder = function(name){
    this.name = name;
    this.files = [];
}
Folder.prototype.add = function(file) {
    this.files.push(file);
}
Folder.prototype.scan = function(){
    for(let i=0, file, files = this.files; file=files[i++];  ){
        file.scan();
    }
}
//File
const File = function(name){
    this.name = name;
}

File.prototype.add = function(){
    throw new Error("不能往文件添加文件啦");
}
File.prototype.scan = function(){
    console.log("开始扫描文件");
}

var folder = new Folder( '学习资料' );
var folder1 = new Folder( 'JavaScript' );
var folder2 = new Folder ( 'jQuery' );
var file1 = new File( 'JavaScript 设计模式与开发实践' );
var file2 = new File( '精通jQuery' );
var file3 = new File( '重构与模式' )

folder1.add( file1 );
folder2.add( file2 );
folder.add( folder1 );
folder.add( folder2 );
folder.add( file3 );

var folder3 = new Folder( 'Nodejs' );
var file4 = new File( '深入浅出Node.js' );
folder3.add( file4 );
var file5 = new File( 'JavaScript 语言精髓与编程实践' );

// 生成最终的文件树:
folder.add( folder3 );
folder.add( file5 );

