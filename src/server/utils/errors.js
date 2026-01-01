import { NextResponse } from "next/server";

export function errorHandler(handler) {
  return async function (...args) {
    try {
      return await handler(...args);
    } catch (error) {

      if (error.statusCode) {
        return NextResponse.json(
          { success: false, message: error.message },
          { status: error.statusCode }
        );
      }
      
      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error"
        },
        { status: 500 }
      );
    }
  };
}
