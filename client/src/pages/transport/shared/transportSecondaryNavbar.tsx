import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function transportSecondaryNavbar() {
  const pages: any = [
    {
      section: "Master",
      only_admin: true,
      routes: [
        {
          title: "Vehicle Master",
          link: "/transport/vehicle-master",
          img: "https://img.icons8.com/color/512/traffic-jam.png",
          only_admin: true,
        },
        {
          title: "Vehicle Replacement",
          link: "/transport/vehicle-replacement",
          img: "https://img.icons8.com/color/512/key-exchange.png",
          only_admin: true,
        },
        {
          title: "Vehicle Maintenance",
          link: "/transport/vehicle-maintenance",
          img: "https://img.icons8.com/color/512/maintenance.png",
          only_admin: true,
        },
        {
          title: "Vehicle Repair",
          link: "/transport/vehicle-repair",
          img: "https://img.icons8.com/color/512/car-service.png",
          only_admin: true,
        },
      ],
    },
    {
      section: "Request",
      only_admin: false,
      routes: [
        {
          title: "Replacement Request",
          link: "/transport/request",
          img: "https://img.icons8.com/color/512/flat-tire.png",
          only_admin: false,
        },
        {
          title: "Maintenance Request",
          link: "/transport/maintenance-request",
          img: "https://img.icons8.com/color/512/tow-truck.png",
          only_admin: false,
        },
        {
          title: "Repair Request",
          link: "/transport/repair-request",
          img: "https://img.icons8.com/color/512/request-service.png",
          only_admin: false,
        },
      ],
    },
    {
      section: "Reports",
      only_admin: true,
      routes: [
        {
          title: "Transport",
          link: "/transport/reports",
          img: "https://img.icons8.com/color/512/graph-report.png",
          only_admin: true,
        },
      ],
    },
  ];

  return (
    <div>
      <Box sx={{ width: "90%" }} className="secondary-navbar nav-flex-section">
        {pages.map((content: any, index: number) => (
          <div className="nav-flex-inside" key={index}>
            <div className="nav-flex-section">
              {content.routes.map((page: any, i: number) => (
                <Link to={page.link}>
                  <button className="nav-link">
                    <span className="nav-icon">
                      <img src={page.img} alt={page.title} />
                    </span>{" "}
                    {page.title}
                  </button>
                </Link>
              ))}
            </div>
            <div className="nav-title-section">
              <p className="nav-title">{content.section}</p>
            </div>
          </div>
        ))}
      </Box>
    </div>
  );
}
