import api from "../services/api";

interface NavBarProps {
  onStart: () => void;
}

function NavBar({ onStart }: NavBarProps) {
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <button
        type="button"
        className="btn mx-2"
        onClick={() => {
          api
            .post("/api/games")
            .then((response) => {
              if (response.status === 201) {
                onStart();
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        Hide treasure 🪙
      </button>
    </nav>
  );
}

export default NavBar;
