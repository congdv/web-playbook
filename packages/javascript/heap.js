class Meeting {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
};

class MinMeetingStack{
  constructor(){
    this.heap = [];
  }
  push(meeting) {
    this.heap.push(meeting);
    this.heap.sort((a, b) => b.end - a.end);
  }
  pop() {
    return this.heap.pop();
  }
}

let m = new MinMeetingStack();

m.push(new Meeting(3,5));
m.push(new Meeting(2,10));

let r = m.pop();
console.log(r);
r= m.pop();
console.log(r);