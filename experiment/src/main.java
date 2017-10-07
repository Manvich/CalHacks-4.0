import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Lin on 10/7/17.
 */
public class main {

    public static void main (String[] arg){
        ArrayList<ArrayList> object = new ArrayList<ArrayList>();
        for (int i = 0; i < 81; i++){
            ArrayList<Integer> store = new ArrayList<Integer>();
            for (int j = 1; j < 10; j++){
                store.add(i);
            }
            object.add(store);
        }
        

        int[][] board = new int[9][9];
        while (true){
            if (noMorePossibleValues(object)) {
                break;
            } else {

            }


            /*if(noMorePossibleValues(object)
            *   break
            *   else*/

        }


    }
    int[] generator (int x){

    }

    public static ArrayList createPossibleIndice(int[][] board, ArrayList<ArrayList> object) {
        ArrayList answer = new ArrayList();
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] > 0) {

                }
            }
        }
    }


    /*returns true if all the tiles have 1 or less possible values */
    public static boolean noMorePossibleValues(ArrayList<ArrayList> object) {
        boolean answer = true;
        for (int i = 0; i < 81; i ++) {
            ArrayList current = object.get(i);
            if (current.size() <= 1) {
                answer = false;
                return answer;
            }
        }
        return answer;
    }



}
