import Form from "../form/form";
import Table from "../table/table";
import "./app.scss";
import useTableAddForm from "../../hooks/table-add-form";
import useTableEditForm from "../../hooks/table-edit-form";
import { useAppSelector } from "../../hooks/store";
import { getTables } from "../../store/table-process/selectors";
import ModalWindow from "../modal-window/modal-window";
import { getModalStatus } from "../../store/global-process/selectors";

function App() {
  const tables = useAppSelector(getTables);
  const isModalOpen = useAppSelector(getModalStatus);

  return (
    <div className="page">
      <div className="container">
        <main className="page__main main-content">
          <section className="main-content__section">
            <Form className="main-content__form" buttonText="Add" useFormHook={useTableAddForm} />
            <Form className="main-content__form" buttonText="Add" useFormHook={useTableAddForm} />
          </section>
          <section className="main-content__section main-content__section--column">
            {tables.map((table) => <Table className="main-content__table" rowsCount={8} key={table.id} tableData={table} />)}
          </section>
        </main>
        <ModalWindow active={isModalOpen}>{isModalOpen && <Form className="modal-window__form" buttonText="Agree" useFormHook={useTableEditForm} />}</ModalWindow>
      </div>
    </div>
  );
}

export default App;
