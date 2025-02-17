import { House, ShoppingBag, UserCircle } from "@phosphor-icons/react";
import clsx from "clsx";
import { NavLink, Outlet, useLocation } from "react-router";

const order = ["/", "/order", "/account"];

export default function HomeLayout() {
  const { pathname } = useLocation();
  const index = Math.max(order.indexOf(pathname), 0);

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Outlet />
      </div>
      <div className="pb-safe-area-b relative flex-none border-t border-gray-300 bg-white shadow-lg">
        <div className="flex h-16">
          <div
            style={{
              transform: `translateX(${index * 100}%)`,
            }}
            className="absolute -top-px left-0 h-0.5 w-1/3 bg-emerald-700 transition"
          ></div>

          <NavLink
            to="/"
            replace={true}
            className={({ isActive }) =>
              clsx(
                "flex min-w-0 flex-1 flex-col items-center justify-center transition active:scale-95 active:opacity-75",
                isActive ? "text-emerald-700" : "text-gray-600",
              )
            }
          >
            {({ isActive }) => (
              <>
                <House
                  weight={isActive ? "fill" : "regular"}
                  className="size-6"
                />
                <span className="text-sm font-medium">Prescriptions</span>
              </>
            )}
          </NavLink>
          <NavLink
            to="/order"
            replace={true}
            className={({ isActive }) =>
              clsx(
                "flex min-w-0 flex-1 flex-col items-center justify-center transition active:scale-95 active:opacity-75",
                isActive ? "text-emerald-700" : "text-gray-600",
              )
            }
          >
            {({ isActive }) => (
              <>
                <ShoppingBag
                  weight={isActive ? "fill" : "regular"}
                  className="size-6"
                />
                <span className="text-sm font-medium">Order</span>
              </>
            )}
          </NavLink>
          <NavLink
            to="/account"
            replace={true}
            className={({ isActive }) =>
              clsx(
                "flex min-w-0 flex-1 flex-col items-center justify-center transition active:scale-95 active:opacity-75",
                isActive ? "text-emerald-700" : "text-gray-600",
              )
            }
          >
            {({ isActive }) => (
              <>
                <UserCircle
                  weight={isActive ? "fill" : "regular"}
                  className="size-6"
                />
                <span className="text-sm font-medium">Account</span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
