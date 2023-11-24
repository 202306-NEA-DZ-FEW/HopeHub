import * as d3 from "d3";
import React, { useEffect, useState } from "react";

function Pie({ data }) {
    // const data= [
    //   {name: "A", value: 10},
    //   {name: "B", value: 25},
    //   {name: "C", value: 40},
    //   {name: "D", value: 60},
    //   {name: "E", value: 80},
    //   {name: "F", value: 90},
    //   {name: "G", value: 70},
    // ]
    const [tooltip, setTooltip] = useState({
        visible: false,
        value: 0,
        left: 0,
        top: 0,
    });

    function drawChart() {
        d3.select("#pie").select("svg").remove();
        const width = 550;
        const height = 350;
        const radius = Math.min(width, height) / 3;

        // Create SVG and append to the div
        const svg = d3
            .select("#pie")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const g = svg
            .append("g")
            .attr("transform", `translate (${width / 2 - 150},${height / 2})`);
        const color = d3.scaleOrdinal([
            "#BFDFDC",
            "#99B4DF",
            "#38A6B6",
            "#ac60ff",
            "#80CED7",
            "#5c517c",
            "#2E8EA1",
        ]);
        const pie = d3.pie().value((d) => d.value);
        const path = d3
            .arc()
            .outerRadius(radius)
            .innerRadius(radius - 30);

        const arc = g
            .selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

        arc.append("path")
            .attr("d", path)
            .attr("fill", (d) => color(d.data.name));

        arc.on("mouseout", () => {
            setTooltip({
                ...tooltip,
                visible: false,
                value: 0,
                left: 0,
                top: 0,
            });
        }).on("mouseover", (e, d) => {
            // Get SVG element
            const svg = d3.select("#pie svg");

            // Get SVG position on page
            const svgRect = svg.node().getBoundingClientRect();

            // Calculate tooltip position inside SVG
            const left = e.clientX - svgRect.left - 25;
            const top = e.clientY - svgRect.top - 25;

            setTooltip({
                visible: true,
                value: d.data.value,
                left,
                top,
            });
        });

        // Add a legend
        const legendG = svg
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 6})`);
        data.forEach((d, i) => {
            const legend = legendG
                .append("g")
                .attr("transform", `translate(0, ${i * 30})`);

            legend
                .append("rect")
                .attr("width", 20)
                .attr("height", 20)
                .attr("fill", color(d.name));

            legend
                .append("text")
                .text(`${d.name}`)
                .style("font-size", 16)
                .attr("y", 15)
                .attr("x", 30);
        });
    }

    useEffect(() => {
        drawChart();
    }, [data]);

    return (
        <>
            <div
                id='pie'
                className='border relative border-NeutralBlack p-4 w-fit col-start-1 col-end-2 row-start-3 h-fit'
            >
                {tooltip.visible ? (
                    <div
                        className={`absolute rounded w-fit h-fit p-2 bg-[rgba(0,0,0,30%)] pointer-events-none text-white text-base font-semibold left-[${tooltip.left}px] top-[50px]`}
                        style={{
                            left: tooltip.left + "px",
                            top: tooltip.top + "px",
                        }}
                    >
                        {tooltip.value}
                    </div>
                ) : null}
            </div>
        </>
    );
}

export default Pie;
