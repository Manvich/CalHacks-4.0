/**
 * Created by Lin on 10/7/17.
 */
import org.junit.Test;
import org.junit.Assert;

import java.util.ArrayList;


public class Testing{


    @Test
    public void testing1() {
        int[][] testingboard = new int[9][9];
        ArrayList<int[]> complete = new ArrayList();
        for (int i = 0; i < 9; i++){
            for (int j = 0; j < 9; j++){
                int[] temp = {i, j};
                complete.add(temp);
            }
        }

    }
}
