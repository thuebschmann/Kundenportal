<?php

namespace App\Repositories\Eloquent;

use App\Models\Rechnungen;

use App\Repositories\RechnungenRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class RechnungenRepository extends BaseRepository implements RechnungenRepositoryInterface
{
    public function __construct(Rechnungen $model)
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

            if (isset($filter['pv_invoice_idRange'])) {
                [$start, $end] = $filter['pv_invoice_idRange'];

                if (!empty($start)) {
                    $query->where('pv_invoice_id', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('pv_invoice_id', '<=', $end);
                }
            }

            if (isset($filter['projekt_idRange'])) {
                [$start, $end] = $filter['projekt_idRange'];

                if (!empty($start)) {
                    $query->where('projekt_id', '>=', $start);
                }

                if (!empty($end)) {
                    $query->where('projekt_id', '<=', $end);
                }
            }

            if (isset($filter['active'])) {
                $query->where('active', $params['active']);
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
            $rechnungen = Rechnungen::create([
                    'pv_invoice_id' => $attributes['pv_invoice_id'] ?? null
,
                    'projekt_id' => $attributes['projekt_id'] ?? null
,
                    'created_by_user' => $currentUser->id
                ]);

            DB::commit();

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
            $rechnungen = Rechnungen::find($id);
            $rechnungen->update([
                    'pv_invoice_id' => $attributes['pv_invoice_id'] ?? null
,
                    'projekt_id' => $attributes['projekt_id'] ?? null
,
                    'updated_by_user' => $currentUser->id
                ]);

            DB::commit();

            return [];
        } catch (Exception $exception) {
            DB::rollback();
        }
    }

    public function destroy($id)
    {
        return $this->model->destroy($id);
    }

    public function findById($id)
    {
        $query = $this->model->newModelQuery();

        $query
            ->where('id', $id);

        return $query->get()[0];
    }

    public function findAllAutocomplete(array $params)
    {
        $query = $this->model->newModelQuery();

        $query->select('*', 'id as label');

        if (isset($params['query'])) {
            $query->where('id', 'like', '%'.$params['query'].'%');
        }

        if (isset($params['limit'])) {
            $query->limit($params['limit']);
        }

        $query->orderBy('id', 'ASC');

        return $query->get()
            ->map(fn($item) => ['id' => $item->id, 'label' => $item->label]);
    }
}

