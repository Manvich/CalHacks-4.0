function init() {
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	context.beginPath();
	for (var x = 0; x < 10; x++) {
		context.moveTo(x*50,0);
		context.lineTo(x*50,450);
		context.moveTo(0, x*50);
		context.lineTo(450,x*50);
	}
	context.stroke();
	context.beginPath();
	context.lineWidth=5;
	for (var x = 0; x < 10; x+=3) {
		context.moveTo(x*50,0);
		context.lineTo(x*50,450);
		context.moveTo(0, x*50);
		context.lineTo(450,x*50);
	}
	context.stroke();
}

function isNumber(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	return !(charCode > 31 && (charCode < 49 || charCode > 57));
}

function check(matrix, textBoxIDs) {
	var bool = true;
	for(var x = 0; x < textBoxIDs.length; x++) {
		bool = bool && (document.getElementById(textBoxIDs[x]).value == "" || matrix[parseInt(textBoxIDs[x]/10,10)][textBoxIDs[x]%10] == parseInt(document.getElementById(textBoxIDs[x]).value));
	}
	(bool) ? alert('You have no errors.') : alert('ERROR DETECTED.');
}

function generateMatrix() {
	var matrix = new Array(9);
	var possibleValues;
	var partitions = [""];
	var tempPartitions = [];
	for (var x = 0; x < 9; x++) {
		matrix[x] = new Array(9);
		for (var y = 0; y < 9; y++) {
			possibleValues = [1,2,3,4,5,6,7,8,9];
			for (var x2 = 0; x2 < x; x2++) {
				var temp = possibleValues.indexOf(matrix[x2][y]);
				if (temp >= 0)
					possibleValues.splice(temp, 1);
			}
			for (var mx = x - x%3; mx < x; mx++) {
				for (var my = y - y%3; my < y+3-y%3; my++) {
					var temp = possibleValues.indexOf(matrix[mx][my]);
					if (temp >= 0)
						possibleValues.splice(temp, 1);
				}
			}
			for (var z = 0; z < partitions.length; z++) {
				for (var zz = 0; zz < possibleValues.length; zz++) {
					if (partitions[z].indexOf(possibleValues[zz]) == -1) {
						tempPartitions.push(partitions[z] + possibleValues[zz]);
					}
				}
			}
			partitions = tempPartitions;
			tempPartitions = [];
		}
		var row = partitions[parseInt(Math.random()*partitions.length,10)];
		if (partitions.length == 0)
			return generateMatrix();
		for (var y = 0; y < 9; y++) {
			matrix[x][y] = parseInt(row.charAt(y), 10);
		}
		partitions = [""];
	}
	return matrix;
}

function prune(og_matrix) {
	var matrix = cloneMatrix(og_matrix);
	var untrimmed = [];
	for (var x = 0; x < 9; x++) {
		for (var y = 0; y < 9; y++) {
			untrimmed.push(x*10 + y);
		}
	}
	while(true) {
		var index = parseInt(Math.random()*untrimmed.length,10)
		var xy = untrimmed[index];
		var temp = matrix[parseInt(xy/10, 10)][xy%10];
		matrix[parseInt(xy/10, 10)][xy%10] = -1
		untrimmed.splice(untrimmed.indexOf(index),1);
		
		if (solve_sudoku(cloneMatrix(matrix)) > 1)
			matrix[parseInt(xy/10, 10)][xy%10] = temp;
		
		if (untrimmed.length == 0)
			return matrix;
	}
}

function cloneMatrix(matrix) {
	var dupe = Array(matrix.length);
	for (var x = 0; x < dupe.length; x++) {
		dupe[x] = Array(matrix[x].length);
		for (var y = 0; y < dupe[x].length; y++) {
			dupe[x][y] = matrix[x][y];
		}
	}
	return dupe;
}

function displayMatrix(matrix) {
	var textBoxIDs = [];
	for (var x = 0; x < 9; x++) {
		for (var y = 0; y < 9; y++) {
			if (matrix[x][y] != -1) {
				var temp = document.createTextNode(matrix[x][y]);
				var span = document.createElement('span');
				span.style.fontSize = "45px";
				span.style.position = 'absolute';
				span.style.left = (22 +50*x) + 'px';
				span.style.top = (114 + (50*y)) + 'px';
				span.appendChild(temp);
				document.body.appendChild(span);
			} else {
				var temp = document.createElement("input");
				temp.type = "text";
				temp.setAttribute('id', x + "" + y);
				temp.setAttribute('maxlength',1);
				temp.setAttribute('onkeypress', 'return isNumber(event)');
				temp.setAttribute('style', 'color: #0066FF; font-family:"Times New Roman"; text-align:center; border-style:none; background-color:transparent; height:45px; width:45px; font-size:45px;');
				temp.style.position = 'absolute';
				temp.style.left = (10 +50*x) + 'px';
				temp.style.top = (116 + (50*y)) + 'px';
				document.body.appendChild(temp);
				textBoxIDs.push(x + "" + y);
			}
		}
	}
	return textBoxIDs;
}


/*
         * Implementation of Knuth's Dancing Links technique
         * for Algorithm X (exact cover).
         */

        /*
         * The MIT License (MIT)
         *
         * Copyright (c) 2008 Greg Hewgill.
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in all
         * copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
         * SOFTWARE.
         */

        function dlx_cover(c)
        {
            c.right.left = c.left;
            c.left.right = c.right;
            for (var i = c.down; i != c; i = i.down) {
                for (var j = i.right; j != i; j = j.right) {
                    j.down.up = j.up;
                    j.up.down = j.down;
                    j.column.size--;
                }
            }
        }

        function dlx_uncover(c)
        {
            for (var i = c.up; i != c; i = i.up) {
                for (var j = i.left; j != i; j = j.left) {
                    j.column.size++;
                    j.down.up = j;
                    j.up.down = j;
                }
            }
            c.right.left = c;
            c.left.right = c;
        }

        function dlx_search(head, solution, k, solutions, maxsolutions)
        {
            if (head.right == head) {
                solutions.push(solution.slice(0));
                if (solutions.length >= maxsolutions) {
                    return solutions;
                }
                return null;
            }
            var c = null;
            var s = 99999;
            for (var j = head.right; j != head; j = j.right) {
                if (j.size == 0) {
                    return null;
                }
                if (j.size < s) {
                    s = j.size;
                    c = j;
                }
            }
            dlx_cover(c);
            for (var r = c.down; r != c; r = r.down) {
                solution[k] = r.row;
                for (var j = r.right; j != r; j = j.right) {
                    dlx_cover(j.column);
                }
                var s = dlx_search(head, solution, k+1, solutions, maxsolutions);
                if (s != null) {
                    return s;
                }
                for (var j = r.left; j != r; j = j.left) {
                    dlx_uncover(j.column);
                }
            }
            dlx_uncover(c);
            return null;
        }

        function dlx_solve(matrix, skip, maxsolutions)
        {
            var columns = new Array(matrix[0].length);
            for (var i = 0; i < columns.length; i++) {
                columns[i] = new Object;
            }
            for (var i = 0; i < columns.length; i++) {
                columns[i].index = i;
                columns[i].up = columns[i];
                columns[i].down = columns[i];
                if (i >= skip) {
                    if (i-1 >= skip) {
                        columns[i].left = columns[i-1];
                    }
                    if (i+1 < columns.length) {
                        columns[i].right = columns[i+1];
                    }
                } else {
                    columns[i].left = columns[i];
                    columns[i].right = columns[i];
                }
                columns[i].size = 0;
            }
            for (var i = 0; i < matrix.length; i++) {
                var last = null;
                for (var j = 0; j < matrix[i].length; j++) {
                    if (matrix[i][j]) {
                        var node = new Object;
                        node.row = i;
                        node.column = columns[j];
                        node.up = columns[j].up;
                        node.down = columns[j];
                        if (last) {
                            node.left = last;
                            node.right = last.right;
                            last.right.left = node;
                            last.right = node;
                        } else {
                            node.left = node;
                            node.right = node;
                        }
                        columns[j].up.down = node;
                        columns[j].up = node;
                        columns[j].size++;
                        last = node;
                    }
                }
            }
            var head = new Object;
            head.right = columns[skip];
            head.left = columns[columns.length-1];
            columns[skip].left = head;
            columns[columns.length-1].right = head;
            solutions = [];
            dlx_search(head, [], 0, solutions, maxsolutions);
            return solutions;
        }

        function solve_sudoku(grid)
        {
            var mat = [];
            var rinfo = [];
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    var g = grid[i][j] - 1;
                    if (g >= 0) {
                        var row = new Array(324);
                        row[i*9+j] = 1;
                        row[9*9+i*9+g] = 1;
                        row[9*9*2+j*9+g] = 1;
                        row[9*9*3+(Math.floor(i/3)*3+Math.floor(j/3))*9+g] = 1;
                        mat.push(row);
                        rinfo.push({'row': i, 'col': j, 'n': g+1});
                    } else {
                        for (var n = 0; n < 9; n++) {
                            var row = new Array(324);
                            row[i*9+j] = 1;
                            row[9*9+i*9+n] = 1;
                            row[9*9*2+j*9+n] = 1;
                            row[9*9*3+(Math.floor(i/3)*3+Math.floor(j/3))*9+n] = 1;
                            mat.push(row);
                            rinfo.push({'row': i, 'col': j, 'n': n+1});
                        }
                    }
                }
            }
            var solutions = dlx_solve(mat, 0, 2);
            if (solutions.length > 0) {
                var r = solutions[0];
                for (var i = 0; i < r.length; i++) {
                    grid[rinfo[r[i]]['row']][rinfo[r[i]]['col']] = rinfo[r[i]]['n'];
                }
                return solutions.length;
            }
            return 0;
        }

        function solve()
        {
            document.getElementById("message").innerHTML = "";
            var g = [];
            for (var i = 1; i <= 9; i++) {
                var r = [];
                for (var j = 1; j <= 9; j++) {
                    var e = document.getElementById("c"+i+j);
                    r.push(e.value);
                }
                g.push(r);
            }
            var r = solve_sudoku(g);
            if (r > 0) {
                for (var i = 1; i <= 9; i++) {
                    for (var j = 1; j <= 9; j++) {
                        var e = document.getElementById("d"+i+j);
                        e.value = g[i-1][j-1];
                    }
                }
                if (r > 1) {
                    document.getElementById("message").innerHTML = "more than one solution";
                }
            } else {
                for (var i = 1; i <= 9; i++) {
                    for (var j = 1; j <= 9; j++) {
                        var e = document.getElementById("d"+i+j);
                        e.value = g[i-1][j-1];
                    }
                }
                document.getElementById("message").innerHTML = "no solution";
            }
        }