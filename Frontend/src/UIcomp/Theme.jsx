import useTheme from "./Context.jsx";

export const ChangeTheme = () => {
   
    const {setTheme} = useTheme()
   

    return (
        <select
        name="themes"
        id="ChangeTheme"
        onChange={(e)=>(setTheme(e.target.value))}
        className="p-2 border-2 w-[160px] rounded bg-white text-black">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="developer">Dev</option>
      </select>
    )
}

const THEMES = {
  light: {
    buttons: "bg-blue-500 text-white hover:bg-blue-600",
    bar: "hover:shadow-blue-500 shadow-lg hover:bg-gray-300 bg-zinc-50 hover:bg-sky-300",
    card1: "bg-zinc-50 text-gray-900  border-gray-200",
    card2: "bg-gray-100 text-amber-500 shadow-md",
    frame: "bg-zinc-50 text-gray-700 border-gray-300",
    icons: "hover:text-amber-500 text-gray-700 ",
    innerContainer: "bg-gray-200 ",
    input1: "border border-gray-300 bg-white text-black",
    input2: "border border-gray-400 bg-gray-100 text-black",
    labels: "text-gray-700",
    outerContainer: "bg-gray-300",
    page1: "bg-zinc-50 text-black",
    page2: "bg-gray-50 text-black",
    shadows1: "bg-gray-100 shadow-lg shadow-zinc-100 hover:shadow-amber-500",
    shadows2: "bg-gray-100 shadow-lg  hover:shadow-amber-500",
    text: "text-black",
  },
  dark: {
    buttons: "bg-gray-800 text-white hover:bg-gray-700",
    bar: "bg-gray-700 text-gray-300 hover:text-black hover:shadow-green-500 hover:bg-zinc-100",
    card1: "bg-black text-white",
    card2: "bg-gray-800 text-white shadow-md",
    icons: "hover:text-green-500 text-gray-50 ",
    frame: "bg-gray-950  border-gray-800",
    innerContainer: "bg-gray-900 p-4 rounded-lg",
    input1: "border border-gray-700 bg-gray-800 text-white",
    input2: "border border-gray-600 bg-gray-700 text-white",
    labels: "text-gray-300",
    page1: "bg-gray-950 text-cyan-300",
    page2: "bg-gray-800 text-white",
    outerContainer: "bg-gray-900",
    shadows1: "bg-gray-100 shadow-lg shadow-zinc-100 hover:shadow-green-500",
    shadows2: "bg-gray-100 shadow-lg  hover:shadow-green-500",
    text: "text-white",
  },
  developer: {
    buttons: "bg-green-600 text-white hover:bg-green-700",
    bar: "glassyEffect hover:shadow-lg   hover:shadow-green-500 hover:bg-zinc-100   hover:text-black ",
    card1: "bg-gray-900 text-green-300 hover:shadow-green-500 ",
    card2: "bg-gray-800 text-green-300  shadow-md",
    icons: "hover:text-green-500 text-emrald-500 ",
    frame: "bg-gray-950  border-green-600",
    innerContainer: "bg-gray-900 p-4 rounded-lg text-green-400",
    input1: "border border-green-500 bg-gray-800 text-green-300",
    input2: "border border-green-400 bg-gray-700 text-green-300",
    labels: "text-green-400",
    page1: "bg-gray-900 text-green-700",
    page2: "bg-gray-800 text-green-600",
    outerContainer: "bg-gray-900",
    shadows1: "bg-gray-100 shadow-lg shadow-zinc-100 hover:shadow-green-500",
    shadows2: "bg-gray-100 shadow-lg  hover:shadow-green-500",
    text: "text-green-400",
  },
};

export default THEMES;