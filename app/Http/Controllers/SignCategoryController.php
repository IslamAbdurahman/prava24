<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSignCategoryRequest;
use App\Http\Requests\UpdateSignCategoryRequest;
use App\Models\SignCategory;
use Inertia\Inertia;

class SignCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $sign_categories = SignCategory::query()
            ->with([
                'signs'
            ]);

        $sign_categories = $sign_categories->get();

        return Inertia::render('sign_category/index', [
            'sign_categories' => $sign_categories,
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
    public function store(StoreSignCategoryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SignCategory $signCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SignCategory $signCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSignCategoryRequest $request, SignCategory $signCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SignCategory $signCategory)
    {
        //
    }
}
