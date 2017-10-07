import java.util.ArrayList;
import java.util.List;

/**
 * Created by Lin on 10/7/17.
 */
public class main {
    public static void main (String[] arg){
        List<Object> object = new ArrayList<Object>();
        for (int i = 0; i < 81; i++){
            ArrayList<Integer> store = new ArrayList<Integer>();
            for (int j = 1; j < 10; j++){
                store.add(i);
            }
            object.add(store);
        }
        

        int[][] board = new int[9][9];
        while (true){

        }


    }
    int[] generator (int x){

    }
}
