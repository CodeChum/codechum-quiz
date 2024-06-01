function Spinner() {
  return (
    <svg className="spinner" data-testid="spinner" viewBox="25 25 50 50">
      <circle className="circle" cx="50" cy="50" data-testid="circle" r="20" />
    </svg>
  );
}

export default Spinner;
