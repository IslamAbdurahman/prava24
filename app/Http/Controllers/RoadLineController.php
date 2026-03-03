<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoadLineRequest;
use App\Http\Requests\UpdateRoadLineRequest;
use App\Models\RoadLine;
use Inertia\Inertia;

class RoadLineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $road_lines = RoadLine::all();

        return Inertia::render('road_line/index', [
            'road_lines' => $road_lines,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoadLineRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(RoadLine $roadLine)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RoadLine $roadLine)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoadLineRequest $request, RoadLine $roadLine)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RoadLine $roadLine)
    {
        //
    }
}
