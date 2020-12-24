const defaultMessage = '404 Oops, something were wrong';

function NotFound({ text }) {
  return (
    <>
      <h1>{text ? text : defaultMessage}</h1>
    </>
  );
}

export default NotFound;
