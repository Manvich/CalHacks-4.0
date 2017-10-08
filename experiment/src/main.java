import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Collections;

/**
 * Created by Lin on 10/7/17.
 */
public class main {

    public static void main(String[] arg) {

        ArrayList<ArrayList<Integer>> object = new ArrayList<ArrayList<Integer>>();
        for (int i = 0; i < 81; i++) {

            ArrayList<Integer> store = new ArrayList<Integer>();
            for (int j = 1; j < 10; j++) {
                store.add(i);
            }
            object.add(store);
        }


        int[][] board = new int[9][9];
        while (anyzeros(board)) {
            if (noMorePossibleValues(object)) {
                break;
            } else {
                ArrayList<int[]> possibleIndices = createPossibleIndices(board, object);
                ArrayList<int[]> bestIndices = chooseBestIndices(possibleIndices, object);
            }

        }




    }
    public static boolean anyzeros(int[][] board) {
        boolean answer = false;
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j ++) {
                if (board[i][j] == 0) {
                    answer = true;
                    return answer;
                }
            }
        }
        return answer;
    }


    /*Returns an ArrayList containing the indices of all empty spaces on the board*/
    public static ArrayList<int[]> createPossibleIndices(int[][] board, ArrayList<ArrayList<Integer>> object) {
        ArrayList<int[]> answer = new ArrayList<int[]>();
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == 0) {
                    int[] index = {i, j};
                    answer.add(index);
                }
            }
        }
        return answer;
    }

    /*from the list of possible indices, choose the ones with the maximum possibilities and return them as
    * a new arraylist*/
    public static ArrayList<int[]> chooseBestIndices(ArrayList<int[]> possibleIndices, ArrayList<ArrayList<Integer>> object) {

        ArrayList<int[]> answer = new ArrayList<int[]>();
        Collections.copy(possibleIndices, answer);
        int max = 0;

        for (int i = 0; i < possibleIndices.size(); i++) {
            int[] current = possibleIndices.get(i);
            ArrayList possibleNums = object.get(9 * current[0] + current[1]);
            if (max < possibleNums.size()) {
                max = possibleNums.size();
            }
        }

        for (int i = 0; i < possibleIndices.size(); i++) {
            int[] current = possibleIndices.get(i);
            ArrayList possibleNums = object.get(9 * current[0] + current[1]);
            if (possibleNums.size() == max) {
                answer.add(current);
            }
        }
        return answer;
    }


    /*returns true if all the tiles have 1 or less possible values */
    public static boolean noMorePossibleValues(ArrayList<ArrayList<Integer>> object) {
        boolean answer = true;
        for (int i = 0; i < 81; i++) {
            ArrayList<Integer> current = object.get(i);
            if (current.size() <= 1) {
                answer = false;
                return answer;
            }
        }
        return answer;
    }
}

