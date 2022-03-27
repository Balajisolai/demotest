
//Class 7.20.2022 Notes////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MailIcon from '@mui/icons-material/Mail';

import "./App.css";
import { useEffect,useState } from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Switch, Route, Link,Redirect } from "react-router-dom";
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import InfoIcon from '@mui/icons-material/Info';
import {useHistory} from "react-router-dom";

import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {API} from "./global";
import { useFormik, validateYupSchema} from "formik";
import * as yup from "yup";




import EditIcon from '@mui/icons-material/Edit';

export default function App() {
  // const names = ["harish", "balaji", "sankavi"];

  // const users = [];

  

 const [movieList, setMovieList] = useState();
 const history = useHistory();
 const [mode,setMode]=useState("light");
 const theme = createTheme({
  palette: {
    mode: mode,
  },
});
  return (
    <ThemeProvider theme={theme}>
<Paper style={{borderRadious:"0px", minHeight:"100vh"}}elevation={4} >
    <div className="App">
      
      <AppBar position="static">
        <Toolbar>
          
        <Button color="inherit" onClick={() => history.push("/")}>Home</Button>
        <Button color="inherit" onClick={() => history.push("/color-game")}>Color game</Button>
        <Button color="inherit" onClick={() => history.push("/tic-tac-toe")}>Tic Tac Toe</Button>
        <Button color="inherit" onClick={() => history.push("/movies")}>Movies</Button>
        <Button color="inherit" onClick={() => history.push("/addmovies")}>AddMovies</Button>
        <Button color="inherit"
        style={{marginLeft:"auto"}} 

        startIcon ={ mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        onClick={() =>setMode(mode==="light"?"dark":"light")}>{mode==="light"?"dark":"light"}mode</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div className='route-container'>
      <Switch>
      <Route  path="/movies/edit/:id">
      <EditMovie/>
      </Route>

    <Route exact path="/"><BasicForm/></Route>


      <Route exact path="/movies/:id"><Msg/>
      <MovieDetails />
      </Route>
      <Route path="/flims">
        <Redirect to ="/movies"/></Route>
      <Route path="/addmovies">
      <AddMovie /> 
      </Route>

      <Route path="/movies/:id">
        <MovieDetails />
      </Route>
     
        <Route path="/movies"><MovieList/>
 
        </Route>
        <Route path="/color-game">
          <AddColor/>
        </Route>
        <Route path="/tic-tac-toe">
          <TicTacToe/>
        </Route>
        <Route path="**"><NotFound/></Route>
       
      </Switch>

     </div>
    </div>
    </Paper>
    </ThemeProvider>
  );
}


function AddMovie (){
  
  const history=useHistory();


  const movieValidationSchema=yup.object({
    name: yup
    .string()
    .required("Why not fill this name?"),
    poster:yup
    .string()
    .required("why not fill this poater?")
    .min(4,"need alonger poster"),
    rating:yup.number().min(0).max(10).required ("why not fill this poster"),
    summary:yup
    .string()
    .required("why not fill this summary?")
    .min(20,"need alonger poster"),

  });

  const formik =useFormik({
    initialValues:{name:"", poster:"", rating:"", summary:""},
    validationSchema: movieValidationSchema,
    onSubmit:(newMovie)=>{
     
      addMovie(newMovie)
    },
  });

 


  const addMovie=(newMovie) => {
    
    console.log("onSubmit",newMovie);
   
    fetch(`${API}/movies/`, {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => history.push("/movies"));
  };

  

return <form onSubmit={formik.handleSubmit} className="add=movie-form">
<TextField onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} id="name" name="name" label="Name" variant="outlined" error={formik.touched.name && formik.errors.name} 
helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""}/>
<TextField onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.poster} id="poster" name="poster" label="Poster" variant="outlined" error={formik.touched.poster && formik.errors.poster}
helperText={formik.touched.poster && formik.errors.poster ? formik.errors.poster : ""}/>
<TextField onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rating} id="rating" name="rating" label="Rating" variant="outlined" error={formik.touched.rating && formik.errors.rating} 
helperText={formik.touched.rating && formik.errors.rating ? formik.errors.rating : ""}/>
<TextField onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.summary} id="summary" name="summary" label="Summary" variant="outlined"error={formik.touched.summar && formik.errors.summary}
helperText={formik.touched.summary && formik.errors.summary ? formik.errors.summary : ""}/>

<Button type="submit" variant="contained" > Add movie </Button>

</form>
}



function EditMovie ( {movieList,setMovieList}){

  const{id}=useParams();
 
const [movie,setMovie]=useState(null);
useEffect(() => {fetch(`${API}/movies/${id}`, {method: "GET",}) 
.then((data) => data.json())
.then((mv) => setMovie(mv))
.catch((err) => console.log(err));},
 []);
 console.log(movie);

 
 return (
   <div>
    {movie ?<EditMovieForm movie={movie}/>:<h2>Loading</h2> }
   </div>
 );

}

function EditMovieForm({movie}){

 
  const history=useHistory();

  const movieValidationSchema=yup.object({
    name: yup
    .string()
    .required("Why not fill this name?"),
    poster:yup
    .string()
    .required("why not fill this poater?")
    .min(4,"need alonger poster"),
    rating:yup.number().min(0).max(10).required ("why not fill this poster"),
    summary:yup
    .string()
    .required("why not fill this summary?")
    .min(20,"need alonger poster"),

  });




  const formik =useFormik({
    initialValues:{
      name:movie.name,
       poster:movie.poster,
       rating:movie.rating, 
      summary:movie.summary,},
    validationSchema: movieValidationSchema,
    onSubmit:(updatedMovie)=>{
      
      editMovie(updatedMovie);
    },
  });

  const editMovie = (updatedMovie) => {
   
    fetch(`${API}/movies/${movie.id}`, 
    {
      method: "PUT",
      body: JSON.stringify(updatedMovie),
    headers: {"Content-Type": "application/json",
  },
})
    .then(() => history.push("/movies"));
   
console.log("Updated", "updatedMovie");

  };

  return(

<form onSubmit={formik.handleSubmit} className="add=movie-form">
<TextField onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} id="name" name="name" label="Name" variant="outlined" error={formik.touched.name && formik.errors.name} 
helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""}/>
<TextField onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.poster} id="poster" name="poster" label="Poster" variant="outlined" error={formik.touched.poster && formik.errors.poster}
helperText={formik.touched.poster && formik.errors.poster ? formik.errors.poster : ""}/>
<TextField onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rating} id="rating" name="rating" label="Rating" variant="outlined" error={formik.touched.rating && formik.errors.rating} 
helperText={formik.touched.rating && formik.errors.rating ? formik.errors.rating : ""}/>
<TextField onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.summary} id="summary" name="summary" label="Summary" variant="outlined"error={formik.touched.summar && formik.errors.summary}
helperText={formik.touched.summary && formik.errors.summary ? formik.errors.summary : ""}/>

<Button color="success" type="submit" variant="contained" > Save </Button>

</form>


  );
  }



function MovieDetails(){
const{id}=useParams();
const [movie,setMovie]=useState({});
 
  useEffect(() => {
    fetch(`${API}/movies/${id}`, {
      method: "GET",
    }) 
      .then((data) => data.json()) 
      .then((mv) => setMovie(mv))
      .catch((err) => console.log(err));
  }, []);


return( 
<div>
  <iframe  
    width="100%" 
    height="650"
     src={movie.trailer}
     title="YouTube video player" 
     frameborder="0" 
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
     allowfullscreen> 
</iframe>
  <div className="movie-detail-container">
    <div className="movie-specs">
      <h3 className="movie-name">{movie.name}</h3>
      <p className="movie-rating">⭐{movie.rating}</p>
      </div>
      <p className="movies-summary">{movie.summary}</p>
      <Button variant="outlined"startIcon={<DeleteIcon />}>
  Delete
</Button>

    </div>
  </div>
);
}



function MovieList(){
  const history = useHistory();
  const [movieList,setMovieList]=useState([]);

  const getMovies=()=>{
    fetch(`${API}/movies`,{
      method: "GET",
    }
  ) 
    .then((data) => data.json()) 
    .then((mvs) => setMovieList(mvs));
  }

useEffect(() => 
  getMovies(), []);

const deleteMovie =(id)=> {
  fetch(`${API}/movies/${id}`,{
    method: "DELETE",
  }).then(()=> getMovies());
};


  return(  <div className="movie-list">
  {movieList.map(({ name, poster, rating, summary,id }, index) => (
    <Movie
      key={index}
     
      name={name}
      poster={poster}
      rating={rating}
      summary={summary} 
      deleteButton={
      <IconButton 
      style={{marginLeft:"auto"}} 
      onClick={()=> deleteMovie(id) }
    aria-label="delete"
    color="error"
    ><DeleteIcon/></IconButton>
  }
  editButton={
    <IconButton onClick={()=>history.push(`/movies/edit/${id}`)}
  aria-label="delete"
  color="secondary"
  ><EditIcon/>
  </IconButton>
  }
  id={id}
      />
  ))}
</div>
);
}

function NotFound(){
  return(
    <div>
      <h1 className="not-found">404</h1>
      <img
      width="100%"
        src="https://static.collectui.com/shots/4144886/pikabu-error-404-large"
        alt="404 Not Found"
        />
    </div>
  );
}
function Msg(){
  return <div>
    <h2>Welcome to Balaji cinema</h2>
  </div>
}

function TicTacToe(){
  const [board,setBoard]=
  useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null]);

    useState([0,1,2,3,4,5,6,7,8]);

    const decideWinner=(board)=>{
const lines=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];
for (let i=0; i<lines.length;i++){
  const[a,b,c]=lines[i];
 
  if(board[a]=== null && board[a]===board[b] && board[b]===board[c] ){
    console.log("Winner is", board[a]);
    return board[a];
  }
}


    };
const winner =decideWinner(board);
    const [isXturn, setIsXTurn]=useState(true);

const handleClick=(index)=>{

  const boardCopy=[...board]
  console.log(boardCopy,index);
  boardCopy[index]= isXturn ? "X" : "O";
  setBoard(boardCopy);
  setIsXTurn(!isXturn);

};
  return (
  <div className="full-game">
  <div className="board">

   {board.map((val,index)=> (
   <GameBox val={val} onPlayerClick={()=> handleClick(index)}/>
   ))}
   
    </div>
    {winner ?<h2>Winner is:{winner}</h2>: ""}
    </div>
  );
}

function GameBox({val, onPlayerClick}){
  
  const styles={
    color: val ==="X"? "green": "red",
  };
  return (
  <div 
 
  onClick={()=> onPlayerClick()}
  style={styles} className="game-box">{val}</div>

  );
  }
function AddColor() {
  const [color, setColor] = useState("pink");
  const styles = {
    background: color,
  };



  const [colorList, setColorList] = useState([
    "crimson",
    "orange",
    "skyblue",
    "red",
  ]);

  return (
    <div>
      <input
        value={color}
        style={styles}
        onChange={(event) => setColor(event.target.value)}
        placeholder="Enter a color" />
      <button onClick={() => setColorList([...colorList, color])}>
        Addcolor
      </button>
     
      {colorList.map((clr) => (
        <ColorBox color={clr} />
      ))}
    </div>
  );
}
function ColorBox({ color }) {
  const styles = {
    backgroundColor: color,
    height: "25px",
    width: "200px",
    marginTop: "10px",
  };
  return <div style={styles}></div>;
}
function Movie({ name, poster, rating, summary,deleteButton,id,editButton}) {
  const styles = {
    color: rating > 8.5 ? "green" : "red",
  };

 
  const [show, setShow] = useState(true);
  const history = useHistory();

 
  return (
    <Card className="movie-container">

      <img src={poster} alt={name} className="movie-poster" />
      <CardContent>
        <div className="movie-specs">
          <h2 className="movie-name">{name}
          <IconButton color="primary" onClick={() => setShow(!show)}
            aria-label="Toggle summary">
            {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>

          <IconButton color="primary" onClick={()=>history.push(`/movies/${id}`)}
            aria-label="Toggle summary">
            <InfoIcon/>
          </IconButton>

          </h2>
          <p style={styles} className="movie-rating">⭐{rating}</p>
        </div>
       
        {show ? <p className="movie-summary">{summary}</p> : ""}
      </CardContent>
      <CardActions>
        <Counter /> {deleteButton} {editButton}
      </CardActions>

    </Card>
  );
}
function Counter() {
  const [like, setLike] = useState(0);
  const [dislike, setdisLike] = useState(0);
  useEffect(()=>{
  console.log("Like is update",like);
}, [like,dislike]);

const incrementLike=()=> setLike (like+1)
const incrementDisLike=()=> setdisLike (dislike+1)
  return (
    <div className="counter-container">
      <IconButton className="like-dislike" onClick={incrementLike} aria-label="like button" color="primary">
        <Badge badgeContent={like} color="primary"> 👍</Badge>
      </IconButton>


      <IconButton className="like-dislike" onClick={incrementDisLike} aria-label="dislike button" color="error">
        <Badge badgeContent={dislike} color="error">👎 </Badge>
      </IconButton>
    
 
    </div>
  );
}
function Welcome({ name, profile }) {

  return (
    <div className="welcome">
      <img className="user-profile-pic" src={profile} alt="profile pic" />
      |<h1>Hello, {name}👍👍</h1>
    </div>
  );
}

const formValidationSchema=yup.object({
  email: yup
  .string().
  required("why not fill this email")
  .min(5, "need a longer email"),
  password: yup
  .string()
  .required("why not fill this password")
  .min(8, "need a longer password")
  .max(12,"Too much password"),
});

function BasicForm(){
  const formik =useFormik({
    initialValues:{email:"", password:""},
    validationSchema: formValidationSchema,
    onSubmit:(values)=>{
      console.log("onSubmit",values);
    },
  });
  return (
  <form onSubmit={formik.handleSubmit}>
    <input 
    id="email"
    name="email"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.email}
     type="email"
     placeholder="email"/>
    
    {formik.touched.email && formik.errors.email ? formik.errors.email : ""}

    <input type="password"
    id="password"
    name="password"
     value={formik.values.password} 
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
    
      placeholder="password"/>
    {formik.touched.password && formik.errors.password ? formik.errors.password : ""}
  <button type="submit">Submit</button>
  </form>
  );
}






// fetch("https://my-json-server.typicode.com/Balajisolai/fun-data/movies"{
//   method:"GET"
// })
// .then((data)=> data.json())
// .then((mvs)=> console.log(mvs));


