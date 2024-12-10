<?php

namespace App\Repositories\Eloquent;

use App\Models\Files;
use App\Models\Categories;
use App\Repositories\FilesRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class FilesRepository extends BaseRepository implements FilesRepositoryInterface
{
    public function __construct(Files $model)
    {
        parent::__construct($model);
    }

    public function findAll($params) : array
    {
        $limit = 0;
        $offset = 0;
        $orderBy = null;

        $query = $this->model->newModelQuery();
        //$query->select("*", "product as prod_id");
        

        if (isset($params['filter'])) {
            $filter = $params['filter'];
        
            if (isset($filter['title'])) {
                $query->where('title', 'like', '%'.$filter['title'].'%');
            }
        
            if (isset($filter['description'])) {
                $query->where('description', 'like', '%'.$filter['description'].'%');
            }
        
            if (isset($filter['priceRange'])) {
                [$start, $end] = $filter['priceRange'];

                if (!empty($start)) {
                    $query->where('price', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('price', '<=', $end);
                }
            }
        
            if (isset($filter['discountRange'])) {
                [$start, $end] = $filter['discountRange'];

                if (!empty($start)) {
                    $query->where('discount', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('discount', '<=', $end);
                }
            }
        
            if (isset($filter['ratingRange'])) {
                [$start, $end] = $filter['ratingRange'];

                if (!empty($start)) {
                    $query->where('rating', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('rating', '<=', $end);
                }
            }
        

            if (isset($filter['active'])) {
                $query->where('active', $params['active']);
            }
        
            if (isset($filter['status'])) {
                $query->where('status', $filter['status']);
            }

            if (isset($filter['createdAtRange'])) {
                [$start, $end] = $filter['createdAtRange'];

                if (!empty($start)) {
                    $query->where('created_at', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('created_at', '<=', $end);
                }
            }
        }

        if ($limit) {
            $query->limit($limit);
        }

        $rows = $query->get();

        return [
            'rows' => $rows->toArray(),
            'count' => $rows->count(),
        ];
    }

    public function create(array $attributes, $currentUser)
    {
        try {
            $attributes = $attributes['data'];
            DB::beginTransaction();
            $attributes['created_by_user'] = $currentUser->id;
            $response = tap($this->model->newModelQuery()
                ->create([
                    'belongsTo' => $attributes['belongsTo'] ?? null,
                    'belongsToId' => $attributes['belongsToId'] ?? null,
                    'belongsToColumn' => $attributes['belongsToColumn'] ?? null,
                    'name' => $attributes['name'] ?? null,
                    'sizeInBytes' => $attributes['sizeInBytes'] ?? null,
                    'privateUrl' => $attributes['privateUrl'] ?? null,
                    'publicUrl' => $attributes['publicUrl'] ?? null,
                    'created_by_user' => $currentUser->id
                ]));
            DB::commit();

            if ($response) {
                return $response->target;
            }

            return [];
        } catch (Exception $exception) {
            DB::rollback();
        }
    }

    public function update($id, array $attributes, $currentUser)
    {
        try {
            $attributes = $attributes['data'];
            DB::beginTransaction();
            $categories = Categories::find($attributes['categories']);

            $instance = $this->model->newModelQuery()->where('id', $id);
            $response = tap($instance
                ->update([
                    'belongsTo' => $attributes['belongsTo'] ?? null,
                    'belongsToId' => $attributes['belongsToId'] ?? null,
                    'belongsToColumn' => $attributes['belongsToColumn'] ?? null,
                    'name' => $attributes['name'] ?? null,
                    'sizeInBytes' => $attributes['sizeInBytes'] ?? null,
                    'privateUrl' => $attributes['privateUrl'] ?? null,
                    'publicUrl' => $attributes['publicUrl'] ?? null,
                    'updated_by_user' => $currentUser->id
                ])
            );
            $Files = Files::find($id);
            $Files->categories()->sync($categories);
            DB::commit();

            if ($response) {
                return $response->target;
            }

            return [];
        } catch (Exception $exception) {
            DB::rollback();
        }
    }

    public function destroy($id)
    {
        return $this->model->destroy($id);
    }

}

