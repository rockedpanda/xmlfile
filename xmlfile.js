#!/usr/bin/env node

'use strict';
var fs = require('fs');
var xml2js = require('xml2js');
var argv = process.argv;
//console.log(argv);
if (argv.length < 3) {
    console.log('Usage: xmlfile 输入文件名.xml 输出文件名.json');//用法：节点创建 js输入xml名 输出json名//
    console.log('输入文件名.xml is the xml for input');//输入XML文件名。xml的xml输入//
    console.log('输出文件名.json is the xml for output, 空缺时输出到标准输入(stdout is used when this is empty)');//JS输出文件名。json是xml输出的//
} else {
    var outputName = '';
    var inputName='';
    if (argv.length >= 3) {
        inputName = argv[2];
    }
    if (argv.length >= 4) {
        outputName = argv[3];
    }
    creatFile(inputName, outputName);
}
/** 主函数,将文件输入并输出 */
function creatFile(fileIn, fileOut) {
    //console.log(fileIn);
    var parser = new xml2js.Parser();
    fs.readFile(fileIn, function(err, data) {
        //console.log(data);
        //将输入的xml文件转成json格式供处理函数使用
        parser.parseString(data, function(err, result) {
            console.log(typeof result);
            if(!!fileOut){
                fs.writeFileSync(fileOut, JSON.stringify(result,null,4), 'utf-8');
            } else {
                console.log(JSON.stringify(result,null,4));
            }
        });
    });
}
