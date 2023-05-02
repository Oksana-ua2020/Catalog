'use strict'

class Array {
    constructor(arr) {
        this.length = arr.length;
        this.data = {
            ...arr
        };
        this.removed = {};
    }

    deleteItem(index) {
        delete this.data[index];
        this.length--;
    }

    addItem(index, items) {
        for (let item of items) {
            this.data[index] = item;
            index++;
            this.length++;
        }
    }

    pop() {
        if (this.length > 0) {
            this.deleteItem(this.length - 1);
        }
        return this.data;
    }

    push(...items) {
        this.addItem(this.length, items);
        return this.data;
    }

    shift() {
        if (this.length > 0) {
            this.deleteItem(0);
        }
        return this.data;
    }

    sort(func = true) {
        if (this.length > 0) {
            const arrayForSort = Object.values(this.data);
            for (let i = this.length - 1; i > 0; i--) {
                for (let k = 0; k < i; k++) {
                    const sortDirection = func 
                        ? arrayForSort[k] > arrayForSort[k + 1] 
                        : arrayForSort[k] < arrayForSort[k + 1]
                    if (sortDirection) {
                        const temp = arrayForSort[k];
                        arrayForSort[k] = arrayForSort[k + 1];
                        arrayForSort[k + 1] = temp;
                    }
                }
            }
            this.data = Object.assign({}, arrayForSort);

        }
        return this.data;
    }

    unshift(...items) {
        if (this.length > 0) {
            const arrayBeforeAdd= Object.values(this.data);
            arrayBeforeAdd.forEach((element, index) => {
                arrayBeforeAdd[index + items.length] = arrayBeforeAdd[index];
                index--;
            });
            this.data = Object.assign({}, arrayBeforeAdd);
        }

        this.addItem(0, items);
        return this.data;
    }

    splice(startIndex, deleteAmount = this.length - startIndex, ...items) {

        if (this.length > 0) {

            let shiftIndex;
            if (startIndex >= 0) {
                shiftIndex = startIndex > this.length - 1 ? this.length - 1 : startIndex;
            } else {
                shiftIndex = this.length + startIndex;
            };

            let removedIndex = shiftIndex;
            for (let i = 0; i < deleteAmount; i++) {
                this.removed[i] = this.data[removedIndex];
                removedIndex++;
            }

            let prevLength = this.length;
            let deleteIndex = shiftIndex;
            for (let i = 0; i < deleteAmount; i++) {
                this.deleteItem(deleteIndex);
                deleteIndex++;
            }

            if (items.length > 0) {
                for (let i = prevLength - 1 + items.length - deleteAmount; i > shiftIndex; i--) {
                    this.data[i] = this.data[prevLength - 1];
                    prevLength--;
                }

                this.addItem(shiftIndex, items);
            }

            this.data = Object.assign({}, Object.values(this.data));
        }
        return this.data;
    }
}

class ImmutableArray extends Array {
    pop() {
        return Object.values(super.pop());
    }

    push(...items) {
        return Object.values(super.push(...items));
    }

    shift() {
        return Object.values(super.shift());
    }

    unshift(...items) {
        return Object.values(super.unshift(...items));
    }

    sort(func) {
        return Object.values(super.sort(func));
    }

    splice(startIndex, deleteAmount, ...items) {
        return Object.values(super.splice(startIndex, deleteAmount, ...items));
    }
}

const array = [30, 100, 1, 5, 27, 10];
const immutArray = new ImmutableArray(array);
// console.log(immutArray.pop());
// console.log(immutArray.push(1000,50));
// console.log(immutArray.shift());
console.log(immutArray.unshift(1000,50,333));
// console.log(array);

// //sort
// console.log(immutArray.sort());
// console.log(immutArray.sort(true));
// console.log(immutArray.sort(false));

// //splice
// //1
// const array1 = ['A', 'B', 'C', 'D'];
// const immutArray1 = new ImmutableArray(array1);
// immutArray1.splice(2, 0, 'J');
// console.log('N1 splice(2, 0, "J")');
// console.log('data1//', immutArray1.data);
// console.log('length1//', immutArray1.length);
// console.log('removed1//', immutArray1.removed);

// //2
// const array2 = ['A', 'B', 'C', 'D', 'E'];
// const immutArray2 = new ImmutableArray(array2);
// immutArray2.splice(3, 1);
// console.log('N2 splice(3, 1)');
// console.log('data2//', immutArray2.data);
// console.log('length2//', immutArray2.length);
// console.log('removed2//', immutArray2.removed);

// //3
// const array3 = ['A', 'B', 'C', 'D'];
// const immutArray3 = new ImmutableArray(array3);
// immutArray3.splice(2, 1, 'K');
// console.log('N3 splice(2, 1, "K")');
// console.log('data3//', immutArray3.data);
// console.log('length3//', immutArray3.length);
// console.log('removed3//', immutArray3.removed);

// //4
// const array4 = ['A', 'B', 'C', 'D'];
// const immutArray4 = new ImmutableArray(array4);
// immutArray4.splice(0, 2, 'P', 'Q', 'R');
// console.log('N4 splice(0, 2, "P", "Q", "R")');
// console.log('data4//', immutArray4.data);
// console.log('length4//', immutArray4.length);
// console.log('removed4//', immutArray4.removed);

// //5
// const array5 = ['A', 'B', 'C', 'D', 'E'];
// const immutArray5 = new ImmutableArray(array5);
// immutArray5.splice(array5.length - 3, 2);
// console.log('N5 splice(array5.length - 3, 2)');
// console.log('data5//', immutArray5.data);
// console.log('length5//', immutArray5.length);
// console.log('removed5//', immutArray5.removed);

// //6
// const array6 = ['A', 'B', 'C', 'D'];
// const immutArray6 = new ImmutableArray(array6);
// immutArray6.splice(-2, 1);
// console.log('N6 splice(-2, 1)');
// console.log('data6//', immutArray6.data);
// console.log('length6//', immutArray6.length);
// console.log('removed6//', immutArray6.removed);

// //7
// const array7 = ['A', 'B', 'C', 'D'];
// const immutArray7 = new ImmutableArray(array7);
// immutArray7.splice(2);
// console.log('N7 plice(2)');
// console.log('data7//', immutArray7.data);
// console.log('length7//', immutArray7.length);
// console.log('removed7//', immutArray7.removed);