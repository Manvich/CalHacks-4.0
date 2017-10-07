import java.util.ArrayList;

/**
 * Created by Lin on 10/7/17.
 */
public class generator {
    private int row;
    private int column;
    ArrayList<Integer> possible = new ArrayList<Integer>();

    public generator(int row, int column){
        this.row = row;
        this.column = column;
        for (int i = 1; i < 10; i++ ){
            possible.add(i);

        }
    }
    public int select(){

    }

}
