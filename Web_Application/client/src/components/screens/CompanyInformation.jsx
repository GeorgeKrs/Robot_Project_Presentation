import ProvikLogo from "../../assets/provikLogo.png";
const CompanyInformation = () => {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-lg-6">
          <li className="list-group-item">
            <b>Name:</b> Provik
          </li>
          <li className="list-group-item">
            <b>Address:</b> Tatoiou 47, Acharnes 136 72
          </li>
          <li className="list-group-item">
            <b>Website:</b> https://www.provik.gr
          </li>
          <li className="list-group-item">
            <b>LinkedIn:</b> https://www.linkedin.com/company/provik1
          </li>
          <li className="list-group-item">
            <b>Facebook:</b> https://www.facebook.com/Provik
          </li>
          <li className="list-group-item">
            <b>Phone:</b> 210-2402974
          </li>
        </div>
        <div className="col-lg-6 m-auto">
          <img
            src={ProvikLogo}
            alt={"Provik's Logo"}
            className="img-thumbnail"
          />
        </div>
      </div>

      <hr className="mt-4" />

      <div className="row mt-4">
        <div className="col-lg-6">
          <h4 className="">Υπηρεσίες &#38; Κατασκευές</h4>

          <hr />
          <li className="list-group-item">1. Custom-Made Μηχανήματα</li>
          <li className="list-group-item">
            2. Ολοκληρωμένες Γραμμές Παραγωγής
          </li>
          <li className="list-group-item">3. Καρτονέττες</li>
          <li className="list-group-item">4. Εγκιβωτιστικά</li>
        </div>
        <div className="col-lg-6">
          <h4 className="">Projects</h4>

          <hr />
          <li className="list-group-item">1. Food &#38; Beverage</li>
          <li className="list-group-item">2. Personal Care &#38; Cosmetics</li>
          <li className="list-group-item">3. Medical</li>
        </div>
      </div>
    </li>
  );
};
export default CompanyInformation;
