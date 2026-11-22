import{readFileSync as A,writeFileSync as B,mkdirSync as C,readdirSync as D}from"node:fs";
function V(p,q){
let S=[],T=[],M=new Int32Array(256),s=0,t=1e6,c=0,f=0,n=p.length,o="",j=0,e;
for(;;){
if(!t--){e=10;break}
if(f<0|f>=n){e=9;break}
let y=p[f],a,b,x;
if(y<8)a=+"00011223"[y],b=+"01102233"[y];
else if(y>15&y<35&y!=31)a=+"2222222122212222222"[y-16],b=1;
else if(y>47&y<84)a=+"011000000000000012000000000000001101"[y-48],b=y==64|y==82;
else{e=5;break}
x=y==1?1:y==2?4:y>47&y<52?2:0;
if(f+x>=n){e=9;break}
let g=f+1+x;
if(s<a){e=2;break}
if(s-a+b>256){e=3;break}
f=g;
if(y<3){if(!y){e=0;break}S[s++]=y==1?p.readInt8(g-1):p.readInt32LE(g-4)}
else if(y==3)s--;
else if(y==4|y==6){S[s]=S[s-1-(y==6)];s++}
else if(y==5|y==7){let a=S[s-1],b=S[s-2];S[s-1]=y==7?S[s-3]:b;S[s-2]=a;if(y==7)S[s-3]=b}
else if(y==23|y==27)S[s-1]=y==23?-S[s-1]|0:~S[s-1];
else if(y>15&y<35){
let d=S[s-2],v=S[s-1];
if(y>18&y<23&!v){e=4;break}
if(y>20&y<23|y==34){d>>>=0;v>>>=0}
s-=2;S[s++]=y==18?Math.imul(d,v):eval("d"+"+ - * / % / % 0 & | ^ 0 << >> >>> 0 == < <".split(" ")[y-16]+"v")|0;
}
else if(y>47&y<53){
if(y==52){if(!c){e=8;break}f=T[--c]}
else if(y==51){if(c==64){e=7;break}T[c++]=g;f=p[g-2]|p[g-1]<<8}
else{let r=p.readInt16LE(g-2),v=y==48?0:S[--s];if(y==48|(y==49)==(v==0))f=g+r}
}
else if(y>63&y<66){
let z=S[s-1];
if(z>>>0>255){e=6;break}
if(y==64)S[s-1]=M[z];else{s-=2;M[z]=S[s]}
}
else if(y>79&y<84){
if(y==80){let z=""+S[s-1];if(o.length+z.length>65536){e=11;break}s--;o+=z}
else if(y==81){if(o.length>65535){e=11;break}o+=String.fromCharCode(S[--s])}
else if(y==82)S[s++]=q[j++]??-1;
else{e=S[--s]&255;break}
}
else{e=5;break}
}
return[e,o];
}
let I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(let d of D(I).sort()){let u="/"+d+"/",[e,o]=V(A(I+u+"program.bin"),A(I+u+"input.bin"));C(O+u,{recursive:true});B(O+u+"stdout.bin",o,"latin1");B(O+u+"exit.txt",""+e)}
